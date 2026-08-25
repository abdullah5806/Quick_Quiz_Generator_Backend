import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.js";

// Register User
export const registerUser = async ({ name, email, password, role }) => {
  // Check if user already exists
  const existingUser = await prisma.user.findUnique({
    where: {email},
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create user
  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      role,
    },
  });
  return {
    message: "User registered successfully",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
// Login User
export const loginUser = async ({ email, password }) => {
  const user = await prisma.user.findUnique({
    where: {email},
  });
  if (!user) {
    throw new Error("Invalid email or password");
  }
  const isPasswordCorrect = await bcrypt.compare(
    password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Invalid email or password");
  }
  // Generate JWT
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
  return {
    message: "Login successful",
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  };
};
