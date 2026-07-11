import mongoose from "mongoose";

export const connectDB = async () => {
  const data = await mongoose.connect(process.env.MNG_URL);
  console.log(`mongoDB server connected.${data.connection.host}`);

  // .catch((err) => {
  //   console.log(err.message);
  // });
};
