import express from "express";
import { addProducts, getAllProducts,getOneProduct } from "../controller/controlproduct.js";
const router = express.Router();

router.route("/products").get( getAllProducts).post(addProducts);
router.get("/product", getOneProduct);

export default router;   //imported as product in app.js