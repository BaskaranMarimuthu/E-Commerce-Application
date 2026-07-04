import express from "express";
import { roleBasedAccess, verifyUser } from "../handler/userAuthent.js";
import { createNewOrder, deleteOrder, getAllOrder, getAllOrderByAdmin, placeFirstOrder, updateStatus } from "../controller/orderController.js";

const router = express.Router();

//Create order
router.route("/new/order").post(verifyUser,createNewOrder);
//get one order
router.route("/order/:id").get(verifyUser,placeFirstOrder );
//get all orders
router.route("/orders/user").get(verifyUser, getAllOrder );
// get all orders by admin
router.route("/admin/orders").get(verifyUser,roleBasedAccess("admin"), getAllOrderByAdmin );
//delete order by admin
router.route("/admin/deleteorder/:id").delete(verifyUser,roleBasedAccess("admin"),deleteOrder).put(verifyUser,roleBasedAccess("admin"),updateStatus);



export default router;