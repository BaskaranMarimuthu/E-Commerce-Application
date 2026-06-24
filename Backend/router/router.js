import express from "express";
import { addProducts, deleteProduct, getAllProducts,getOneProduct, updateProduct } from "../controller/controlproduct.js";
const router = express.Router();

//router.get("/products", getAllProduct);
router.route("/products").get( getAllProducts).post(addProducts);

//router.get("/product/:id", getOneProduct);
router.route("/product/:id").get(getOneProduct).put(updateProduct).delete(deleteProduct);


export default router;   //imported as product in app.js