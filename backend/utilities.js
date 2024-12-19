const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // استخراج التوكن من الـ Header

  if (!token) {
    return res.status(401).json({ error: true, message: "Access token is missing." });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: true, message: "Invalid or expired access token." });
    }
    req.user = user; // تخزين بيانات المستخدم المستخلصة من التوكن
    next();
  });
}

module.exports = { authenticateToken };
