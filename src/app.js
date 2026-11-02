import express from "express";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// ─── Middleware ────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Health check ──────────────────────────────────────────────
app.get("/health", (req, res) => {
  res.status(200).json({ success: true, message: "Server is running" });
});

// ─── API Routes ────────────────────────────────────────────────
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// ─── 404 handler ──────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// ─── Error handler (must be last) ─────────────────────────────
app.use(errorHandler);

export default app;
