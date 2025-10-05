const jwt = require('jsonwebtoken');

const generateToken = (id) => {
  console.log('JWT_SECRET:', process.env.JWT_EXPIRES_IN);
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

module.exports = generateToken;
