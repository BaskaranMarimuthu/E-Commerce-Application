import HandleError from "../handler/errorclass.js";

export default (err, req, res, next) => {
  err.statuscode = err.statuscode || 500;
  err.message = err.message || "Internal server error";

  //dupicate jwt token key error
  if (err.code === 11000) {
    const message = `this ${Object.keys(err.keyValue)} is already exist`;
    err = new HandleError(message, 400);
  }

  res.status(err.statuscode).json({
    success: false,
    message: err.message,
  });
};
