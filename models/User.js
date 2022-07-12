import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      maxLength: 50,
      trim: true,
      unique: 1,
    },
    sex: {
      type: String,
      enum: ["man", "woman", null],
      default: null,
    },
    height: {
      type: Number,
    },
    weight: {
      type: Number,
    },
    marketing: {
      type: Boolean,
    },
    navertoken: {
      type: String,
    },
    access_token: {
      type: String,
    },
    refresh_token: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
