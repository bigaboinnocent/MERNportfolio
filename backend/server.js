import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { connectDB } from "./config/db.js";
import Admin from "./models/Admin.js";

import authRoutes from "./routes/authRoutes.js";
import aboutRoutes from "./routes/aboutRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import experienceRoutes from "./routes/experienceRoutes.js";
import educationRoutes from "./routes/educationRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const requiredEnv = ["MONGODB_URI", "JWT_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD"];
const missing = requiredEnv.filter((key) => !process.env[key]);
if (missing.length) {
  console.error(`\n[FATAL] Missing required .env values: ${missing.join(", ")}`);
  console.error("Copy backend/.env.example to backend/.env and fill these in.\n");
  process.exit(1);
}

const app = express();

app.use(
  cors({
    origin: (process.env.CLIENT_ORIGIN || "http://localhost:5173").split(","),
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/experience", experienceRoutes);
app.use("/api/education", educationRoutes);
app.use("/api/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

// Creates the single admin account from .env the first time the server runs.
// This is the account you'll use to log in at /admin/login.
const ensureAdminExists = async () => {
  const existing = await Admin.findOne({ email: process.env.ADMIN_EMAIL.toLowerCase() });
  if (existing) return;

  await Admin.create({
    email: process.env.ADMIN_EMAIL.toLowerCase(),
    password: process.env.ADMIN_PASSWORD, // hashed automatically by the Admin model
    name: "Admin",
  });
  console.log(`[Admin] Created admin account for ${process.env.ADMIN_EMAIL}`);
};

const start = async () => {
  await connectDB();
  await ensureAdminExists();

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`[Server] Running on http://localhost:${port}`));
};

start();
