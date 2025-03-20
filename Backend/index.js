require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");
const Quiz = require("../models/quiz");


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

app.get("/", (req, res) => {
    res.send("Quiz App Backend is Running");
});

// Dynamic pages (optional)
const pages = ["about", "contact", "login", "signin"];
pages.forEach((page) => {
    app.get(`/${page}`, (req, res) => {
        res.send(`Quiz App ${page.charAt(0).toUpperCase() + page.slice(1)} Page is Running`);
    });
});

// ✅ Secret Code Verification Route
app.post('/api/verify-secret-code', async (req, res) => {
    const { secretCode } = req.body;

    try {
        const quiz = await Quiz.findOne({ secretCode });

        if (!quiz) {
            return res.status(400).json({ valid: false, message: "Invalid secret code" });
        }

        res.json({ valid: true, quizId: quiz._id });
    } catch (error) {
        console.error("Error verifying secret code:", error);
        res.status(500).json({ valid: false, message: "Server error" });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at: http://localhost:${PORT}`);
});
