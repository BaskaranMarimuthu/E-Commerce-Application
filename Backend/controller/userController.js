import userModel from "../models/userModel.js";
import HandleError from "../handler/errorclass.js";
import { tokenGernerate } from "../handler/jwtToken.js";
import { sendEmail } from "../handler/sendMail.js";
import crypto from "crypto"

export const registerUser = async (req, res, next) => {
  //console.log(req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next(
      new HandleError(`name,email and password all three must be enter `, 400),
    );
  }

  const userDetails = await userModel.create({
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

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new HandleError(`please enter email and password`, 404));
  }
  const login = await userModel.findOne({ email }).select("+password");
  if (!login) {
    return next(new HandleError("Invalid Email or Password", 401));
  }
  const isValidPassword = await login.checkPassword(password);
  if (!isValidPassword) {
    return next(new HandleError("Invalid Email or Password", 401));
  }

  tokenGernerate(login, 200, res);
};

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
  const user = await userModel.findOne({ email });
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
try{
  await sendEmail({email:user.email, subject:"password reset request",message});
  res.status(200).json({
    success:true,
    message:`email is send to ${user.email}succesfully`});

}catch(err){
  console.log(err);
  user.resetPasswordExpire=undefined;
  user.resetPasswordToken=undefined;
  await user.save({validateBeforeSave:false});
  return next(new HandleError("email not send try again",500) )
}

};
export const resetPW=async(req,res,next)=>{
  const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
  console.log(resetPasswordToken);
  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire:{
      $gt:Date.now() 
    }
  });
  if(!user){
    return next(new HandleError("invalid or reset code expired",400) );
  }
  const{password,confrimPassword}=req.body;
  if(password!==confrimPassword){
    return next(new HandleError("password doesn't match",400) );
  }
  user.password = password;
  user.resetPasswordExpire=undefined;
  user.resetPasswordToken=undefined;
  await user.save();
  tokenGernerate(login, 200, res);

};