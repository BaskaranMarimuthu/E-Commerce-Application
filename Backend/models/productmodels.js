import mongoose from "mongoose";
import userModel from "./userModel.js";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please enter the product name"],
  },
  description: {
    type: String,
    required: [true, "please enter the product description"],
  },
  price: {
    type: Number,
    required: [true, "please enter the product price"],
    maxlength: [8, "price can't be exceeded 8 digit"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  image: [
    {
      public_id: {
        type: String,
        required: [true],
      },
      url: {
        type: String,
        required: [true],
      },
    },
  ],
  category: {
    type: String,
    required: [true, "please enter the category"],
  },
  stock: {
    type: Number,
    required: [true, "please enter the available stock of the product"],
    default: 1,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: { type: mongoose.Schema.ObjectId, ref: userModel, required: true },
      avatar: { type: String },
      name: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "UserModel",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Product", productSchema);
