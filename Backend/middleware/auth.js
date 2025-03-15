const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Extract token

  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token, "SECRET_KEY"); // Use the same secret key
    req.user = verified; // Store user info in request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token" });
  }
};
