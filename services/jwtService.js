const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

class JWTService {
  static generateToken(payload) {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JWTService;
