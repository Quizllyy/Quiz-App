const express = require("express");
const authMiddleware = require("../middleware/auth"); // Import JWT middleware
const router = express.Router();

router.get("/dashboard", authMiddleware, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}, you have access!` });
});

module.exports = router;
