"use server";

import { connectToDatabase } from "@/lib/database";
import Fundraising, {
  IFundraising,
} from "@/lib/database/models/fundraising.model";
import Contribution from "@/lib/database/models/contribution.model";
import User from "@/lib/database/models/user.model";
import { revalidatePath } from "next/cache";

export const getFundraisings = async ({ limit }: { limit?: number }) => {
  await connectToDatabase();

  const fundraisings: IFundraising[] = await Fundraising.find({
    status: "approved",
  })
    .sort({ createdAt: -1 })
    .limit(limit || 6)
    .exec();
  if (!fundraisings) {
    return;
  }

  return fundraisings;
};

interface IFundraisingWithCreator extends IFundraising {
  creatorName?: string;
  creatorAvatar?: string;
}

export const getFundraisingById = async (id: string) => {
  await connectToDatabase();

  const petition: IFundraisingWithCreator = await Fundraising.findById(
    id
  ).exec();
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

export const getFundraisingByEmail = async (email: string) => {
  await connectToDatabase();

  const fundraising: IFundraising[] = await Fundraising.find({
    creator_email: email,
    status: "approved",
  }).exec();
  if (!fundraising) {
    return [];
  }

  return fundraising;
};

export const signFundraising = async (prev: unknown, formData: FormData) => {
  const event_id = formData.get("event_id") as string;
  const user_email = formData.get("user_email") as string;
  const amount = Number(formData.get("amount")) as number;

  await connectToDatabase();

  const newContribution = new Contribution({
    type: "petition",
    event_id,
    amount,
    user_email,
  });
  await newContribution.save();

  await Fundraising.findByIdAndUpdate(event_id, {
    $inc: { current: amount },
  }).exec();

  revalidatePath(`/fundraising/${event_id}`);
  return {
    success: true,
    message: "Amount donated successfully",
    amount: amount,
  };
};
