import jwt from "jsonwebtoken";
import type { GenerateJWTokenT } from "../types/authT.ts";

function generateJWToken(user: GenerateJWTokenT) {
  const secretKey = process.env.JWT_SECRET! as jwt.Secret;
  return jwt.sign(user, secretKey, {
    expiresIn: "24h",
  });
}

export default generateJWToken;
