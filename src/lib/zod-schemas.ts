import { z } from "zod";

export const PetitionSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.string().optional(),
  creator_email: z.string().email({ message: "Invalid email address" }),
  goal: z.number().min(1, { message: "Goal must be greater than 0" }),
  current: z
    .number()
    .min(0, { message: "Current value must be greater than or equal to 0" }),
});

export const FundraisingSchema = z.object({
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  image: z.string().optional(),
  creator_email: z.string().email({ message: "Invalid email address" }),
  goal: z.number().min(1, { message: "Goal must be greater than 0" }),
  current: z
    .number()
    .min(0, { message: "Current value must be greater than or equal to 0" }),
});
