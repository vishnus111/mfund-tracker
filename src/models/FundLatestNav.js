import mongoose,{Schema} from "mongoose";

const fundLatestNavSchema = new Schema({
  schemeCode: { type: Number, required: true, unique: true },
  nav: Number,
  date: String, // "DD-MM-YYYY"
  updatedAt: { type: Date, default: Date.now }
});

export const FundLatestNav = mongoose.model("FundLatestNav", fundLatestNavSchema);
