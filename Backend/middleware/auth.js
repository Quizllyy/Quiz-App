const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRoles = []) => {
  return (req, res, next) => {
    const token = req.header("Authorization")?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Access Denied" });

    try {
      const verified = jwt.verify(token, "SECRET_KEY");
      req.user = verified;

      if (requiredRoles.length && !requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Forbidden: Access Denied" });
      }

      next();
    } catch (error) {
      res.status(400).json({ message: "Invalid token" });
    }
  };
};

module.exports = authMiddleware;
