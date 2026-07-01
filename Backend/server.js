import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config({ path: "Backend/config/config.env" });
const PORT = process.env.PORT || 3000;

connectDB(); // connect to the server.js before server starts

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
