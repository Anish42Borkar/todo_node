import express from "express";

// Type import separately
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import type { UserBodyT } from "../types/userType.ts";
import jwt from "jsonwebtoken";

import db from "../db.ts";

const router = express.Router();

router.post("/register", (req: Request<{}, {}, UserBodyT>, res: Response) => {
  try {
    const body = req.body;
    db.exec(`INSERT INTO user (username, password)
  VALUES (${body.username}, ${body.password});`);

    res.status(200).json({ message: "Registered successfully" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to Registered successfully", error });
  }
});

router.get("/login", (req, res) => {});

export default router;
