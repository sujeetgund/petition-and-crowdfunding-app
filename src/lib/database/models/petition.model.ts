import mongoose, { Schema, Document } from "mongoose";

export interface IPetition extends Document {
  title: string;
  description: string;
  image?: string;
  creator_email: string;
  goal: number;
  current: number;
  status: "pending" | "approved" | "rejected";
}

const PetitionSchema = new Schema<IPetition>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String },
    creator_email: { type: String, required: true },
    goal: { type: Number, required: true },
    current: {
      type: Number,
      required: true,
      validate: {
        validator: function (value: number) {
          return value <= this.goal;
        },
        message: "Current value must be less than or equal to the goal.",
      },
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Petition ||
  mongoose.model<IPetition>("Petition", PetitionSchema);
