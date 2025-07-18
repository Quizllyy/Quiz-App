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

// Logging
app.use((req, res, next) => {
  console.log(`📩 ${req.method} ${req.url}`);
  if (req.method !== "GET") console.log("🔍", req.body);
  next();
});

// Routes
app.use("/api/verify", require("./routes/verify"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/questions", require("./routes/questions"));
app.use("/api/excel", require("./routes/excelQuizRoutes.js"));
app.use("/api/results", require("./routes/result"));

// Root
app.get("/", (req, res) => {
  res.send("✅ Quiz App Backend is Running");
});

app.listen(PORT, () =>
  console.log(`🚀 Server running at: http://localhost:${PORT}`)
);
