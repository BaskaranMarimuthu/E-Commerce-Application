import express from "express";
import { roleBasedAccess, verifyUser } from "../handler/userAuthent.js";
import { addProducts, deleteProduct, getAllProducts,getOneProduct, updateProduct } from "../controller/controlproduct.js";
const router = express.Router();

//without login
router.get("/products", getAllProducts);
router.get("/product/:id", getOneProduct);

//admin side
router.route("admin/product/create").post(verifyUser,roleBasedAccess("admin"), addProducts);


router.route("/admin/product/product/:id").put(verifyUser,roleBasedAccess("admin"),updateProduct).delete(verifyUser,roleBasedAccess("admin"),deleteProduct);


export default router;   //imported as product in app.js