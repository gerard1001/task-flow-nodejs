import {
  compare,
  compareSync,
  genSalt,
  genSaltSync,
  hash,
  hashSync,
} from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const hashPassword = (pwd) => {
  const salt = genSaltSync(10);
  return hashSync(pwd, salt);
};

export const comparePassword = (plainPassword, hashedPassword) => {
  return compareSync(plainPassword, hashedPassword);
};

export const generateToken = (payload, expiresIn) => {
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
};

export const decodeToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
