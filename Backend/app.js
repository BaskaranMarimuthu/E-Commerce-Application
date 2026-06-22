import express from "express";
import product from './router/router.js' //imported from router
const app = express();

app.use(express.json());
app.use('/api/v1',product);
export default app;
