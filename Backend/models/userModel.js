import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, select: false },
    nickname: { type: String, required: true, trim: true },
    phone: { type: String, required: true, unique: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    // profileImage: { type: String, default: "" },
  },
  { timestamps: true }
);

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;