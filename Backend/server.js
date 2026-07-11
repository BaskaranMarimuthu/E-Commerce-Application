import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { v2 as cloudinary } from "cloudinary";
const result =dotenv.config({ path: "./Backend/config/config.env" });
const PORT = process.env.PORT || 3000;

connectDB(); // connect to the server.js before server starts
  // console.log("dotenv result:", result);
console.log("PORT:", process.env.PORT);
console.log("MNG_URL:", process.env.MNG_URL);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

process.on("uncaughtException", (err) => {
  console.log(`Error occur:${err.message}`);
  console.log(`server didn't respond because of uncaughtException error`);

  process.exit(1);
});

const server = app.listen(PORT, () => {
  console.log(`server is running at localhost:${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error occur:${err.message}`);
  console.log(`server didn't respond because of unhandledRejection error`);
  server.close(() => {
    process.exit(1);
  });
});
