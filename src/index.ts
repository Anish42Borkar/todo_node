import express from "express";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import authRoute from "./routes/authRoutes.ts";
import todosRouter from "./routes/todoRoutes.ts";
import authMiddleware from "./middleware/authmiddleware.ts";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// const __filename = __filename;
const __dirname = dirname(__filename);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../public")));
app.use("/auth", authRoute);
app.use("/todos", authMiddleware, todosRouter);
console.log(path.join(__dirname, "public", "index.html"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
