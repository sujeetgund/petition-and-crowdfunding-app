"use server";

import { connectToDatabase } from "@/lib/database";
import Petition from "@/lib/database/models/petition.model";
import { PetitionSchema } from "@/lib/zod-schemas";

export const createPetition = async (prev: unknown, formData: FormData) => {
  await connectToDatabase();

  const result = PetitionSchema.safeParse({
    title: formData.get("title"),
    description: formData.get("description"),
    image: formData.get("image"),
    creator_email: formData.get("creator_email"),
    goal: Number(formData.get("goal")),
    current: 1,
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().formErrors,
    };
  }

  const data = result.data;

  const new_petition = await Petition.create({
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
