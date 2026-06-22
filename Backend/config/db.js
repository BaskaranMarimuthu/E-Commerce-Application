import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.MNG_URL)
    .then((data) => {
      console.log(`mongoDB server connected.${data.connection.host}`);
    })
    .catch((err) => {
      console.log(err.message);
    });
};
