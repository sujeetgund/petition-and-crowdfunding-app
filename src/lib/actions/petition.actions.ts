"use server";

import { connectToDatabase } from "@/lib/database";
import Petition, { IPetition } from "@/lib/database/models/petition.model";
import Contribution from "@/lib/database/models/contribution.model";
import User from "@/lib/database/models/user.model";
import { revalidatePath } from "next/cache";

export const getPetitions = async ({ limit }: { limit?: number }) => {
  await connectToDatabase();

  const petitions: IPetition[] = await Petition.find({ status: "approved" })
    .sort({ createdAt: -1 })
    .limit(limit || 6)
    .exec();
  if (!petitions) {
    return;
  }

  return petitions;
};

interface IPetitionWithCreator extends IPetition {
  creatorName?: string;
  creatorAvatar?: string;
}

export const getPetition = async (id: string) => {
  await connectToDatabase();

  const petition: IPetitionWithCreator = await Petition.findById(id).exec();
  if (!petition || petition.status !== "approved") {
    return;
  }

  const creator = await User.findOne({ email: petition.creator_email })
    .select("name image")
    .exec();
  if (creator) {
    petition.creatorName = creator.name;
    petition.creatorAvatar = creator.image;
  }

  return petition;
};

// get petitions by email
export const getPetitionsByEmail = async (email: string) => {
  await connectToDatabase();

  const petitions: IPetition[] = await Petition.find({
    creator_email: email,
    status: "approved",
  }).exec();
  if (!petitions) {
    return [];
  }

  return petitions;
};

export const signPetition = async (prev: unknown, formData: FormData) => {
  const event_id = formData.get("event_id") as string;
  const user_email = formData.get("user_email") as string;

  // log("event_id", event_id);
  // log("user_email", user_email);

  await connectToDatabase();

  const existingContribution = await Contribution.findOne({
    type: "petition",
    event_id,
    user_email,
  });

  if (existingContribution) {
    return { success: false, message: "Already signed", already_signed: true };
  }

  const newContribution = new Contribution({
    type: "petition",
    event_id,
    amount: 1,
    user_email,
  });
  await newContribution.save();

  await Petition.findByIdAndUpdate(event_id, { $inc: { current: 1 } }).exec();

  revalidatePath(`/petition/${event_id}`);
  return {
    success: true,
    message: "Signed successfully",
    already_signed: false,
  };
};

export const countTotalSignatures = async (event_id: string) => {
  await connectToDatabase();

  const totalSignatures = await Contribution.countDocuments({
    type: "petition",
    event_id,
  }).exec();
  return totalSignatures;
};
