import express from "express";
import {
  deleteUser,
  getSingleUser,
  getUserAdmin,
  loginUser,
  logout,
  profileCheck,
  registerUser,
  resetPassword,
  resetPW,
  updatePassword,
  updateProfile,
  userRoleUpdate,
} from "../controller/userController.js";
import { roleBasedAccess, verifyUser } from "../handler/userAuthent.js";

const router = express.Router();

router.route("/registeruser").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logout);
router.route("/password/forgot").post(resetPassword);
router.route("/reset/:token").post(resetPW);
router.route("/profile").get( verifyUser,profileCheck );
router.route("/password/update").put( verifyUser,updatePassword);
router.route("/profile/update").put( verifyUser,updateProfile);
router.route("/admin/users").get( verifyUser,roleBasedAccess("admin"),getUserAdmin );

router.route("/admin/users/:id").get( verifyUser,roleBasedAccess("admin"),getSingleUser )
                                .put( verifyUser,roleBasedAccess("admin"),userRoleUpdate )
                                .delete( verifyUser,roleBasedAccess("admin"),deleteUser );



export default router;
