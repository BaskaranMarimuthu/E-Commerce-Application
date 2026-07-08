import express from "express";
import { roleBasedAccess, verifyUser } from "../handler/userAuthent.js";
import {
  addProducts,
  adminAllProducts,
  createReviewProduct,
  deleteProduct,
  deleteReviews,
  getAllProducts,
  getOneProduct,
  updateProduct,
  viewProductReviews,
} from "../controller/controlproduct.js";
const router = express.Router();

//without login
router.get("/products", getAllProducts);

router.get("/product/:id", getOneProduct);
//review
router.route("/review").put(verifyUser, createReviewProduct);

//admin side
router
  .route("/admin/products")
  .get(verifyUser, roleBasedAccess("admin"), adminAllProducts);

router
  .route("/admin/product/create")
  .post(verifyUser, roleBasedAccess("admin"), addProducts);

// view review admin
router
  .route("/admin/reviews")
  .get(verifyUser, roleBasedAccess("admin"), viewProductReviews)
  .delete(verifyUser, roleBasedAccess("admin"), deleteReviews);

router
  .route("/admin/productupdate/:id")
  .put(verifyUser, roleBasedAccess("admin"), updateProduct)
  .delete(verifyUser, roleBasedAccess("admin"), deleteProduct);

export default router; //imported as product in app.js
