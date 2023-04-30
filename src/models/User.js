import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    image: String,
    admin: Boolean,
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", UserSchema);
