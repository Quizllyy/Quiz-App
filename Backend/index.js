require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
  console.log(`📩 Incoming Request: ${req.method} ${req.url}`);
  if (req.method !== "GET") console.log("🔍 Request Body:", req.body);
  next();
});

// Importing Routes
const authRoutes = require("./routes/auth");
const quizRoutes = require("./routes/quiz");
const questionRoutes = require("./routes/questions");
const resultRoutes = require("./routes/result");
const quizExcelRoutes = require("./routes/quizExcelRoutes");
const resultRoutes = require("./routes/result");


// ✅ Fixed API Endpoints
app.use("/api/auth", authRoutes);
app.use("/api/quiz", quizRoutes);  // For manually entered quizzes
app.use("/api/questions", questionRoutes);
app.use("/api/results", resultRoutes); // 🛠️ Changed from /api/quiz to /api/results
app.use("/api/excel", quizExcelRoutes); // For Excel-uploaded quizzes
app.use("/api/results", resultRoutes);

app.get("/", (req, res) => {
  res.send("Quiz App Backend is Running");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at: http://localhost:${PORT}`);
});
