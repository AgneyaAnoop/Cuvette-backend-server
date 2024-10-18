// routes/authRoutes.js
const express = require('express');
const { 
  register, 
  login, 
  logout, 
  verifyEmail, 
  verifyMobile,
  resendVerification 
} = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/verify-email', verifyEmail);
router.post('/verify-mobile', verifyMobile);
router.post('/resend-verification', resendVerification);

module.exports = router;