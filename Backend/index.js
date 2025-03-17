<<<<<<< HEAD
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./database.js");
=======
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database.js');
>>>>>>> 527e05898e5c10a3e768b2b332af72a9b770da24

const app = express();
const PORT = process.env.PORT || 8080;

<<<<<<< HEAD
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

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
=======
connectDB();

// Middleware
// app.use(express.json());
// app.use(cors());

// app.get('/', (req, res) => {
//     res.send('Quiz App Backend is Running');
// });

app.get('/', (req, res) => {
    res.send('Quiz App home is Running');
});

app.get('/about', (req, res) => {
    res.send('Quiz App about is Running');
});

app.get('/contact', (req, res) => {
    res.send('Quiz App contact is Running');
});

app.get('/login', (req, res) => {
    res.send('Quiz App login is Running');
});

app.get('/signin', (req, res) => {
    res.send('Quiz App sign-in is Running ');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
>>>>>>> 527e05898e5c10a3e768b2b332af72a9b770da24
