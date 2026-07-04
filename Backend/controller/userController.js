import User from "../models/userModel.js";
import HandleError from "../handler/errorclass.js";
import { tokenGernerate } from "../handler/jwtToken.js";
import { sendEmail } from "../handler/sendMail.js";
import crypto from "crypto";

// regiter user
export const registerUser = async (req, res, next) => {
  //console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new HandleError(`name,email and password all three must be enter `, 400),
    );
  }

  const userDetails = await User.create({
    name,
    password,
    email,
    avatar: {
      public_id: "sample_id",
      url: "sample_url",
    },
  });
  tokenGernerate(userDetails, 201, res);
};

// lohin user
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  

  if (!email || !password) {
    return next(new HandleError(`please enter email and password`, 404));
  }

  const login = await User.findOne({ email }).select("+password");
  

  if (!login) {
    
    return next(new HandleError("Invalid Email or Password", 401));
  }

  const isValidPassword = await login.checkPassword(password);


  if (!isValidPassword) {
    
    return next(new HandleError("Invalid Email or Password", 401));
  }

  tokenGernerate(login, 200, res);
};

//logout user
export const logout = async (req, res, next) => {
  const options = {
    expires: new Date(Date.now()),
    httpOnly: true,
  };
  res.cookie("token", null, options);
  res.status(200).json({ success: true, message: "Sauccessfully logged out" });
};

//reset password
export const resetPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new HandleError("user does not exist", 400));
  }
  let resetToken;
  try {
    resetToken = user.createPasswordResetToken();
    await user.save();
  } catch (err) {
    console.log(err);
    return next(
      new HandleError("could not save reset token, try again later", 500),
    );
  }

  const resetPasswordURL = `${req.protocol}://${req.host}/reset/${resetToken}`;
  const message = `Reset your password using link below .link expires within 30 mins if it doesn't belong to u just ingone it:\n${resetPasswordURL}\n`;
  try {
    await sendEmail({
      email: user.email,
      subject: "password reset request",
      message,
    });
    res.status(200).json({
      success: true,
      message: `email is send to ${user.email}succesfully`,
    });
  } catch (err) {
    console.log(err);
    user.resetPasswordExpire = undefined;
    user.resetPasswordToken = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new HandleError("email not send try again", 500));
  }
};

//check  and rest new passoword
export const resetPW = async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");
  console.log(resetPasswordToken);
  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: {
      $gt: Date.now(),
    },
  });
  if (!user) {
    return next(new HandleError("invalid or reset code expired", 400));
  }
  const { password, confrimPassword } = req.body;
  if (password !== confrimPassword) {
    return next(new HandleError("password doesn't match", 400));
  }
  user.password = password;
  user.resetPasswordExpire = undefined;
  user.resetPasswordToken = undefined;
  await user.save();
  tokenGernerate(login, 200, res);
};

//user profile check

export const profileCheck = async (req, res, next) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

//update password
export const updatePassword = async (req, res, next) => {
  const { oldPassword, newPassword, confrimPassword } = req.body;

  const user = await User.findById(req.user.id).select("+password");
  const isCorrect = await user.checkPassword(oldPassword);
  if (!isCorrect) {
    return next(new HandleError("incorrect assword", 400));
  }
  if (newPassword !== confrimPassword) {
    return next(new HandleError("wrong comfrim password", 400));
  }
  user.password = newPassword;
  await user.save();
  tokenGernerate(login, 200, res);
};

//update profile

export const updateProfile = async (req, res, next) => {
  const { name, email } = req.body;
  const updateDetails = { name, email };
  const user = await User.findByIdAndUpdate(req.user.id, updateDetails, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    success: true,
    message: "profile updated successfully",
    user,
  });
};

//getuser
export const getUserAdmin = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

//get single user

export const getSingleUser = async (req, res, next) => {
  const id = req.params.id;
  const users = await User.findById(id);
  if (!users) {
    return next(new HandleError("user id doesn't exist", 400));
  }
  res.status(200).json({
    success: true,
    users,
  });
};
//update user role
export const userRoleUpdate = async(req, res, next)=>{
  const {role}=req.body;
  const id=req.params.id;
  const Role={role};
  const user = await User.findByIdAndUpdate(id, Role, {new:true});
  if(!user){
    return next(new HandleError("user doesn't exist", 400));
  }
  res.status(200).json({
    success: true,
    user,
  });

}
//delete user

export const deleteUser = async(req, res, next)=>{
  const id=req.params.id;
   const users = await User.findById(id);
  if (!users) {
    return next(new HandleError("user id doesn't exist", 400));
  }
  await userModel.findByIdAndDelete(id);
  res.status(200).json({
    success: true,
    message:"user deatils deleted successfully"
  });

};
