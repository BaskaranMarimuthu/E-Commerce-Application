import express from "express";
import Product from "./router/routerProduct.js"; //imported from router
import User from "./router/userRoutes.js";
import Order from "./router/orderRoutes.js";
import errorHandler from "./middleware/error.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/v1", Product);
app.use("/api/v1", User);
app.use("/api/v1", Order);

// put the middleware always after the route because its throw an error uncatched error
app.use(errorHandler);

export default app;
