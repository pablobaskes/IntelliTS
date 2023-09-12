import { verify, sign } from "jsonwebtoken";
import "dotenv/config";
const JWT_SECRET = process.env.JWT_SECRET || "token 1111";
const generateToken = (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, {
    expiresIn: "2h",
  });
  return jwt;
};
const verifyToken = (jwt: string) => {
  const authorized = verify(jwt, JWT_SECRET);
  return authorized;
};
export { generateToken, verifyToken };
