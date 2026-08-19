const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    console.log("\n=================================");
    console.log("AUTHENTICATION CHECK");
    console.log("Authorization header:", req.headers.authorization);
    console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

    const token = req.headers.authorization?.split(" ")[1];

    console.log("Token received:", !!token);

    if (!token) {
      console.log("❌ No token provided");

      return res.status(401).json({
        message: "Authentication required",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ JWT verified successfully");
    console.log("Decoded token:", decoded);

    req.userId = decoded.userId;

    next();
  } catch (error) {
    console.error("❌ JWT verification failed");
    console.error("Error:", error.message);

    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
