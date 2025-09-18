import mongoose,{Schema} from "mongoose";

const fundLatestNavSchema = new Schema({
  schemeCode: { type: Number, required: true, unique: true },
  nav: Number,
  date: String, 
  updatedAt: { type: Date, default: Date.now }
});

export const FundLatestNav = mongoose.model("FundLatestNav", fundLatestNavSchema);
