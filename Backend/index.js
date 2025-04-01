require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

app.use(express.json());
app.use(cors());

// Importing Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

const quizRoutes = require("./routes/quiz");
app.use("/api/quiz", quizRoutes);

const questionRoutes = require("./routes/questions");
app.use("/api/questions", questionRoutes);

const resultRoutes = require("./routes/result");
app.use("/api/quiz", resultRoutes);

const quizExcelRoutes = require("./routes/quizExcelRoutes");
app.use("/api/excel", quizExcelRoutes);

app.get("/", (req, res) => {
  res.send("Quiz App Backend is Running");
});

app.use("/api/excel", quizExcelRoutes); // Use Excel quiz routes

app.listen(PORT, () => {
  console.log(`Server running at: http://localhost:${PORT}`);
});
