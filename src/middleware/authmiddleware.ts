import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import type { GenerateJWTokenT } from "../types/authT.ts";
function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  const secretKey = process.env.JWT_SECRET!;
  if (!token) {
    res.status(401).json({ message: "token not provided" });
    return;
  }

  if (token) {
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
      const payload = decode as JwtPayload;
      console.log(payload);

      req.user = {
        ...payload,
      } as GenerateJWTokenT;

      next();
    });
  }
}

export default authMiddleware;
