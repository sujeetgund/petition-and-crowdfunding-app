"use server";

import { connectToDatabase } from "../database";
import Fundraising, {
  IFundraising,
} from "../database/models/fundraising.model";
import User from "../database/models/user.model";

export const getFundraisings = async ({ limit }: { limit?: number }) => {
  await connectToDatabase();

  const petitions: IFundraising[] = await Fundraising.find({})
    .sort({ createdAt: -1 })
    .limit(limit || 6)
    .exec();
  if (!petitions) {
    return;
  }

  return petitions;
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

export const getFundraisingByEmail = async (email: string) => {
  await connectToDatabase();

  const fundraising: IFundraising[] = await Fundraising.find({
    creator_email: email,
  }).exec();
  if (!fundraising) {
    return [];
  }

  return fundraising;
};

// export const signFundraising = async (id: string, email: string) => {

// }
