// create token and save into cookie

export const sendToken = async (user, res, statusCode) => {
  const token = user.getJWTToken();
  const cookieOptions = {
    httpOnly: true,
    secure: true, // Set to true in production with HTTPS
    sameSite: "None", // Must be 'None' for cross-origin cookies

    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
  };
  res
    .status(statusCode)
    .cookie("token", token, cookieOptions)
    .json({ success: true, user, token });
};
