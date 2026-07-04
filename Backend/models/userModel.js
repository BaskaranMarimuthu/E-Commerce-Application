import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto"
const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "must enter your name"],
      maxLength: [20, "Please length not exceed 20 char"],
      minLength: [3, "Please length not below 3 char"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
      validate: [validator.isEmail, "please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      maxLength: [8, "Password length must not exceed 8 char"],
      select: false, // it is a selected field because when we pass the pw we cant read it
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);
userModel.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userModel.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userModel.methods.checkPassword = async function (emailPassword) {
  return await bcrypt.compare(emailPassword, this.password);
};

userModel.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  this.resetPasswordExpire = Date.now() +30*60*1000;
  return resetToken;
}
export default mongoose.model("User", userModel);
