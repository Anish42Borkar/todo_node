import express from "express";

// Type import separately
import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import type { UserBodyT } from "../types/userType.ts";

import generateJWToken from "../utils/generateJWToken.ts";

import prisma from "../prismaClient.ts";
const router = express.Router();
router.post(
  "/register",
  async (req: Request<{}, {}, UserBodyT>, res: Response) => {
    try {
      const body = req.body;

      const hashedPassword = bcrypt.hashSync(body.password, 8);
      // Register user

      const result = await prisma.$transaction(async (tx) => {
        const checkUserExist = await prisma.user.findUnique({
          where: {
            username: body.username,
          },
        });

        if (checkUserExist) {
          throw new Error("Username already exists");
        }

        const user = await tx.user.create({
          data: {
            username: body.username,
            password: hashedPassword,
          },
        });

        await tx.todo.create({
          data: {
            task: `Hello :) Add your first todo!`,
            userId: user.id,
          },
        });

        return user; // Return user so we can use it later
      });

      const token = generateJWToken({ id: result.id });

      res
        .status(200)
        .json({ message: "Registered successfully", token: token });
    } catch (error) {
      console.log(typeof error);
      if (error instanceof Error) {
        if (error.message === "Username already exists") {
          return res.status(400).json({ message: error.message });
        }
      }

      res.status(500).json({
        message: "Something went wrong. Please try again.",
      });
    }
  }
);

router.post(
  "/login",
  async (req: Request<{}, {}, UserBodyT>, res: Response) => {
    try {
      const body = req.body;

      const user = await prisma.user.findUnique({
        where: {
          username: body.username,
        },
      });

      if (!user) {
        throw new Error("User not exists");
      }

      const token = generateJWToken({ id: user.id });
      if (!user) {
        res.status(404).json({ message: "user not found" });
        return;
      }
      const passwordValid = bcrypt.compareSync(body.password, user.password);
      if (!passwordValid) {
        res.status(401).json({ message: "Invalid password" });

        return;
      }
      res.status(200).json({ message: "Login successfully", token: token });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "Something went wrong. Please try again." });
    }
  }
);

export default router;
