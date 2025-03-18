require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");

const app = express();
const PORT = process.env.PORT || 8080;

// Connect Database
connectDB();

// Middleware
app.use(express.json());
app.use(cors());

// Import Routes
const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);

// Default Route
app.get("/", (req, res) => {
    res.send("Quiz App Backend is Running 🚀");
});

// Additional Routes
app.get("/about", (req, res) => {
    res.send("Quiz App About Page is Running");
});

app.get("/contact", (req, res) => {
    res.send("Quiz App Contact Page is Running");
});

app.get("/login", (req, res) => {
    res.send("Quiz App Login Page is Running");
});

app.get("/signin", (req, res) => {
    res.send("Quiz App Sign-in Page is Running");
});

// Start Server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
