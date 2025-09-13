import mongoose,{Schema} from "mongoose";

const portfolioSchema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  schemeCode: { type: Number, required: true },
  units: { type: Number, required: true },
  purchaseDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now }
});

export const Portfolio  = mongoose.model("Portfolio", portfolioSchema);
