import express from "express";
import type { Request } from "express";

import db from "../db.ts";

const router = express.Router();
router.get("/", (req, res) => {
  try {
    const sql = db.prepare("SELECT * FROM todos where user_id = ?");
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
    res.status(500).json({ message: "server error" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const { completed } = req.body;
    const id = req.params.id;
    const sql = db.prepare("UPDATE todos SET completed = ? WHERE id = ?");
    sql.run(completed, id);
    res.status(202).json({ message: "Updated Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;

    const sql = db.prepare("DELETE FROM todos WHERE id = ?");
    sql.run(id);
    res.status(203).json({ message: "Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
