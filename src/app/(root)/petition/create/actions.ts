"use server";

import { connectToDatabase } from "@/lib/database";
import Petition from "@/lib/database/models/petition.model";
import { PetitionSchema } from "@/lib/zod-schemas";

const LAMBDA_URI = process.env.LAMBDA_URI || "";

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

  fetch(LAMBDA_URI, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: new_petition._id,
      title: new_petition.title,
      content: new_petition.content,
      type: "petition",
    }),
  });

  return {
    success: true,
  };
};
