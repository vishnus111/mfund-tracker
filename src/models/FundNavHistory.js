import mongoose,{Schema} from "mongoose";

const fundNavHistorySchema = new Schema({
  schemeCode: { type: Number, required: true },
  nav: Number,
  date: String, 
  createdAt: { type: Date, default: Date.now }
});

export const FundNavHistory = mongoose.model("FundNavHistory", fundNavHistorySchema);
