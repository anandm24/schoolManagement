import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateToken = (id) => {
  // No expiresIn option means token won't expire automatically
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export default generateToken;
