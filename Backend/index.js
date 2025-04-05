require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");

const app = express();
const PORT = process.env.PORT || 8080;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`📩 Incoming Request: ${req.method} ${req.url}`);
  if (req.method !== "GET") console.log("🔍 Request Body:", req.body);
  next();
});

// Routes
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const questionRoutes = require("./routes/questions");
const quizExcelRoutes = require("./routes/quizExcelRoutes");
const resultRoutes = require("./routes/result");


app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);             // Manually created quizzes
app.use("/api/questions", questionRoutes);    // CRUD for questions
app.use("/api/results", resultRoutes);      // Quiz result handling
app.use("/api/excel", quizExcelRoutes);       // Excel-uploaded quizzes

// Root route
app.get("/", (req, res) => {
  res.send("✅ Quiz App Backend is Running");
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
