<<<<<<< HEAD
require("dotenv").config();
console.log("MongoDB URI:", process.env.MONGO_URL);
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || process.env.MONGO_URL;
    if (!mongoURI) {
      throw new Error("MONGO_URI or MONGO_URL is missing in .env file");
    }

    await mongoose.connect(mongoURI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
=======
require('dotenv').config();

const connectDB = async () => {
    console.log("MongoDB Connected Successfully");
};

module.exports = connectDB;
>>>>>>> 527e05898e5c10a3e768b2b332af72a9b770da24
