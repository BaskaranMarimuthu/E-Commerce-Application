import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({ path: "Backend/config/config.env" });
const PORT = process.env.PORT || 3000;




app.listen(PORT, () => {
  console.log(`server is running at localhost:${PORT}`);
});
