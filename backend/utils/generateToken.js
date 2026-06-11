const jwt = require("jsonwebtoken");

const generateToken = (userId, name, role) => {
  return jwt.sign(
    { userId, name, role },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = generateToken;