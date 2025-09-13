import { Schema } from "mongoose";
import mongoose from "mongoose";

const fundSchema = new Schema({
  schemeCode: { type: Number, required: true, unique: true },
  schemeName: String,
  isinGrowth: String,
  isinDivReinvestment: String,
  fundHouse: String,
  schemeType: String,
  schemeCategory: String
});

export const Fund = mongoose.model("Fund", fundSchema);
