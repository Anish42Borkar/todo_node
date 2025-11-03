import express from "express";
import db from "../db.ts";

const router = express.Router();
router.get("/", (req, res) => {
  const sql = db.prepare("SELECT * FROM todos where username = ?");
  const todos = sql.all(req?.user?.id!);
  res.status(200).json(todos);
});

router.post("/", (req, res) => {});

router.put("/:id", (req, res) => {});

router.delete("/:id", (req, res) => {});

export default router;
