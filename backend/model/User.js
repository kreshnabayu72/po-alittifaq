import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullName: String,
  username: String,
  password: String,
});

export const UserModel = mongoose.model("User", userSchema);
