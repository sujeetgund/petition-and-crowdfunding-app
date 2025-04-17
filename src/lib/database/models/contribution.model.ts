import mongoose, { Schema, Document } from "mongoose";

export interface IContribution extends Document {
  type: "petition" | "fundraising";
  event_id: string;
  amount: number;
  user_email: string;
}

const ContributionSchema = new Schema<IContribution>(
  {
    type: { type: String, enum: ["petition", "fundraising"], required: true },
    event_id: { type: String, required: true },
    amount: { type: Number, required: true },
    user_email: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Contribution ||
  mongoose.model<IContribution>("Contribution", ContributionSchema);
