export const tokenGernerate = (userDetails, statuscode, res) => {
  const token = userDetails.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.EXPIRE_COOKIE * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
  };
  res.status(statuscode).cookie("token", token, options).json({
    success: true,
   user: userDetails,
    token,
  });
};
