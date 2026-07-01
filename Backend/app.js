import express from "express";
import product from './router/routerProduct.js' //imported from router
import User from './router/userRoutes.js'
import errorHandler from './middleware/error.js'
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use('/api/v1',product);
app.use('/api/v1',User);




// put the middleware always after the route because its throw an error uncatched error
app.use(errorHandler); 

export default app;
