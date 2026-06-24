import express from "express";
import product from './router/router.js' //imported from router
import errorHandler from './middleware/error.js'
const app = express();

app.use(express.json());

app.use('/api/v1',product);

// put the middleware always after the route because its throw an error uncatched error
app.use(errorHandler); 

export default app;
