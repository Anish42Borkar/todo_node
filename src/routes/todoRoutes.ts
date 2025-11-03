import express from "express";
import type { Request } from "express";

import db from "../db.ts";

const router = express.Router();
router.get("/", (req, res) => {
  try {
    const sql = db.prepare("SELECT * FROM todos where user_id = ?");
    console.log(req?.user);
    const todos = sql.all(req?.user?.id!);
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

router.post("/", (req: Request<{}, {}, { task: string }>, res) => {
  try {
    const { task } = req.body;
    const sql = db.prepare("INSERT INTO todos (user_id, task) VALUES (?,?)");
    const todos = sql.run(req?.user?.id, task);
    res.status(200).json(todos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

export default router;
