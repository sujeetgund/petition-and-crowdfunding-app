"use server";

import { connectToDatabase } from "@/lib/database";
import Fundraising from "@/lib/database/models/fundraising.model";
import { FundraisingSchema } from "@/lib/zod-schemas";

export const createFundraising = async (prev: unknown, formData: FormData) => {
  await connectToDatabase();

  const result = FundraisingSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    creator_email: formData.get("creator_email"),
    goal: Number(formData.get("goal")),
    current: 0,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().formErrors,
    };
  }

  const data = result.data;

  const new_petition = await Fundraising.create({
    title: data.title,
    description: data.description,
    image: data.image,
    creator_email: data.creator_email,
    goal: data.goal,
    current: data.current,
  });
  if (!new_petition) {
    return {
      success: false,
      errors: ["Failed to create petition"],
    };
  }

  return {
    success: true,
  };
};
