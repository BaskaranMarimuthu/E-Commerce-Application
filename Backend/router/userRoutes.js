import express from "express";
import {
  loginUser,
  logout,
  registerUser,
  resetPassword,
  resetPW,
} from "../controller/userController.js";

const router = express.Router();

router.route("/registeruser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(resetPassword);
router.route("/reset/:token").post(resetPW);

export default router;
