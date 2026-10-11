const jwt = require("jsonwebtoken");

const authenticateUser = (req, res, next) => {
  try {
    console.log("========== AUTH CHECK ==========");
    console.log("Authorization header:", req.headers.authorization);

    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("❌ NO TOKEN RECEIVED");

      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    console.log("✅ Token received");

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    console.log("✅ Token verified:", decoded);

    req.user = decoded;

    next();
  } catch (error) {
    console.error("❌ AUTH ERROR:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateUser;