import jwt from "jsonwebtoken";
import jwtConfig from "../config/jwt.js";

const generateToken = (userId, role) => {
  return jwt.sign(
    {
      id: userId,
      role: role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "7d",
    }
  );
};

export default generateToken;