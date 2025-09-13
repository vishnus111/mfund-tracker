import mongoose,{Schema} from "mongoose";

const userSchema = new  Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  createdAt: { type: Date, default: Date.now }
});

// module.exports = mongoose.model("User", userSchema);

export const User = mongoose.model("User",userSchema)
