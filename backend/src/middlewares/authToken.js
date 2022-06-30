const jwt = require("jsonwebtoken");
require("dotenv/config");

const authToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ msg: "unauthorized" });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, email) => {
    if (err) return res.status(401).json({ msg: "unauthorized" });
    req.email = email;
    next();
  });
};

module.exports = authToken;
