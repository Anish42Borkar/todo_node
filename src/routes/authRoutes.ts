import express from "express";

// Type import separately
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import type { UserBodyT } from "../types/userType.ts";
import jwt from "jsonwebtoken";

import db from "../db.ts";
import generateJWToken from "../utils/generateJWToken.ts";

const router = express.Router();
import prisma from "../prismaClient.ts";

router.post(
  "/register",
  async (req: Request<{}, {}, UserBodyT>, res: Response) => {
    try {
      const body = req.body;

      const hashedPassword = bcrypt.hashSync(body.password, 8);
      // Register user
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: hashedPassword,
        },
      });

      const todo = await prisma.todo.create({
        data: {
          task: `Hello :) Add your first todo!`,
          userId: user.id,
        },
      });

      // insertTodo.run(result.lastInsertRowid, todo);

      // throw "error";

      const token = generateJWToken({ id: user.id });
      // console.log(token);

      res
        .status(200)
        .json({ message: "Registered successfully", token: "token" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
);

router.post("/login", (req: Request<{}, {}, UserBodyT>, res: Response) => {
  try {
    const body = req.body;
    const user = db.prepare(`SELECT * FROM user where username = ?`) as any;
    const userData = user.get(body.username);

    const token = generateJWToken({ id: user.id });
    if (!userData) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    console.log(userData);
    const passwordValid = bcrypt.compareSync(body.password, userData.password);
    if (!passwordValid) {
      res.status(401).json({ message: "Invalid password" });

      return;
    }
    res.status(200).json({ message: "Login successfully", token: token });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

export default router;
