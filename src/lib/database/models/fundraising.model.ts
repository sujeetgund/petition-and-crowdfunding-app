import mongoose, { Schema, Document } from "mongoose";

interface IFundraising extends Document {
  title: string;
  description: string;
  image?: string;
  creator_email: string;
  goal: number;
  current: number;
}

const FundraisingSchema = new Schema<IFundraising>(
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
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.Fundraising ||
  mongoose.model<IFundraising>("Fundraising", FundraisingSchema);
