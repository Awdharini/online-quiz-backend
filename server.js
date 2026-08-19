const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const quizRoutes = require("./routes/quizRoutes");
const attemptRoutes = require("./routes/attemptRoutes");

const app = express();

// ===============================
// Environment Variables
// ===============================

const requiredEnvs = ["MONGO_URI", "JWT_SECRET"];

const missing = requiredEnvs.filter((variable) => !process.env[variable]);

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);

  console.error("Make sure backend/.env contains MONGO_URI and JWT_SECRET.");

  process.exit(1);
}

// ===============================
// Middleware
// ===============================

app.use(cors());

app.use(express.json());

// ===============================
// Routes
// ===============================

app.use("/api/auth", authRoutes);

app.use("/api/quizzes", quizRoutes);

app.use("/api/attempts", attemptRoutes);

// ===============================
// Test Route
// ===============================

app.get("/", (req, res) => {
  res.json({
    message: "Online Quiz Maker API is running!",
  });
});

// Test attempts route
app.get("/api/attempts-server-test", (req, res) => {
  res.json({
    message: "Attempts server route is working!",
  });
});

// ===============================
// MongoDB Connection
// ===============================

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);

  console.log(`Quiz API: http://localhost:${PORT}/api/quizzes`);

  console.log(`Attempts API: http://localhost:${PORT}/api/attempts`);
});
