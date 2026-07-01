import  jwt from "jsonwebtoken";
import HandleError from "./errorclass.js";
import userModel from "../models/userModel.js";

export const verifyUser = async(req, res, next) =>{
 const {token} = req.cookies;
//  console.log(token);
 if(!token){
    return next(new HandleError("access denied please login to access",401));
 }

 const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
//  console.log(decodedToken);
 req.user = await userModel.findById(decodedToken.id);
//  console.log(req.user);
 next();
}

export const roleBasedAccess = (...roles)=>{
   return (req, res, next)=>{
      if(!roles.includes(req.user.role)){
         return next(new HandleError(`Role-${req.user.role} is not allowed to access this role`,403))
      }
      next();
   }
}