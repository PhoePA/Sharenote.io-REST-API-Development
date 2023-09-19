const jwt = require("jsonwebtoken");
require("dotenv").config();
const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "User is not Authenticated!" });
  }
  const token = authHeader.split(" ")[1];
  try {
    const tokenMatch = jwt.verify(token, process.env.JWT_KEY);
    if (!tokenMatch) {
      return res.status(401).json({ message: "User is not Authenticated!" });
    }
    req.userId = tokenMatch.userId;
    next();
  } catch (err) {
    return res.status(401).json({ message: "User is not Authenticated!" });
  }
};

module.exports = isAuth;
