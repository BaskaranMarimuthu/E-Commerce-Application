import express from "express";
import { getAllProducts,getOneProduct } from "../controller/controlproduct.js";
const router = express.Router();

router.get("/products", getAllProducts);
router.get("/product", getOneProduct);

export default router;   //imported as product in app.js