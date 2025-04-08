"use server";

import { connectToDatabase } from "../database";
import Petition, { IPetition } from "../database/models/petition.model";
import User from "../database/models/user.model";

export const getPetitions = async ({ limit }: { limit?: number }) => {
  await connectToDatabase();

  const petitions: IPetition[] = await Petition.find({})
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
  if (!petition) {
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
  }).exec();
  if (!petitions) {
    return [];
  }

  return petitions;
};

// export const signPetition = async (id: string, email: string) => {

// }
