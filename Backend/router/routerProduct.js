import express from "express";
import { roleBasedAccess, verifyUser } from "../handler/userAuthent.js";
import { addProducts, deleteProduct, getAllProducts,getOneProduct, updateProduct } from "../controller/controlproduct.js";
const router = express.Router();

//router.get("/products", getAllProduct);
router.route("/products").get(verifyUser,getAllProducts).post(verifyUser,roleBasedAccess("admin"), addProducts);

//router.get("/product/:id", getOneProduct);
router.route("/product/:id").get(verifyUser,getOneProduct).put(verifyUser,roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);


export default router;   //imported as product in app.js