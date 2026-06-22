import express from "express";
import product from './router/router.js'
const app = express();

app.use('/api/v1',product);
export default app;
