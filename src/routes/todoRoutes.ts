import express from "express";
import type { Request } from "express";

import db from "../db.ts";
import prisma from "../prismaClient.ts";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const result = await prisma.todo.findMany({
      where: {
        userId: req.user?.id as any,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/", async (req: Request<{}, {}, { task: string }>, res) => {
  try {
    const { task } = req.body;

    const result = await prisma.todo.create({
      data: {
        task,
        userId: req?.user?.id as any,
      },
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { completed } = req.body;
    const id = Number(req.params.id);

    await prisma.todo.update({
      where: {
        id: id,
      },
      data: {
        completed: completed,
      },
    });

    res.status(202).json({ message: "Updated Successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = Number(req.params.id);

    await prisma.todo.delete({
      where: { id },
    });

    res.status(203).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
