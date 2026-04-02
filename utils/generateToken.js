const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      role: user.role, 
    },
    JWT_SECRET,
    { expiresIn: "1d" }
  );
};

module.exports = generateToken;