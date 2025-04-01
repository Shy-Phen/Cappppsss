import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
  // Generate JWT token with a 7-day expiration time
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Set the token in the HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true, // Helps prevent XSS attacks
    secure: process.env.NODE_ENV === "production", // Ensure cookie is only sent over HTTPS in production
    sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", // Prevent CSRF in production, allow cross-site cookies in development
    maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time (7 days)
  });

  return token;
};
