require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database.js');

const app = express();
const PORT = process.env.PORT || 8080;

connectDB();

// Middleware
// app.use(express.json());
// app.use(cors());

app.get('/', (req, res) => {
    res.send('Quiz App Backend is Running');
});

app.get('/home', (req, res) => {
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
    res.send('Quiz App sign-in is Running 🚀');
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
