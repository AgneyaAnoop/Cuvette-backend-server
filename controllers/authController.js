// controllers/authController.js
const Company = require('../models/Company');
const OTPService = require('../services/otpService');
const emailService = require('../services/emailService');
const smsService = require('../services/smsService');
const JWTService = require('../services/jwtService');

exports.register = async (req, res) => {
  try {
    const { name, email, password, mobile } = req.body;
    const company = new Company({ name, email, password, mobile });
    await company.save();

    // Generate and send email OTP
    const emailOTP = await OTPService.generateOTP(company._id, 'email');
    await emailService.sendVerificationEmail(email, emailOTP);

    // Generate and send mobile OTP
    const mobileOTP = await OTPService.generateOTP(company._id, 'mobile');
    await smsService.sendVerificationCode(mobile, mobileOTP);

    res.status(201).json({ 
      message: 'Company registered successfully. Please check your email and mobile for verification codes.' 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const company = await Company.findOne({ email });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    await OTPService.verifyOTP(company._id, otp, 'email');

    company.isEmailVerified = true;
    await company.save();

    res.json({ message: 'Email verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.verifyMobile = async (req, res) => {
  try {
    const { mobile, otp } = req.body;
    const company = await Company.findOne({ mobile });

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    await OTPService.verifyOTP(company._id, otp, 'mobile');

    company.isMobileVerified = true;
    await company.save();

    res.json({ message: 'Mobile number verified successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const company = await Company.findOne({ email });
    if (!company || !(await company.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    if (!company.isEmailVerified) {
      return res.status(401).json({ error: 'Please verify your email before logging in' });
    }
    if (!company.isMobileVerified) {
      return res.status(401).json({ error: 'Please verify your mobile number before logging in' });
    }

    const token = JWTService.generateToken({ id: company._id });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 1 day
    });

    res.json({ message: 'Logged in successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.resendVerification = async (req, res) => {
  try {
    const { type, identifier } = req.body; // type can be 'email' or 'mobile'
    
    let company;
    if (type === 'email') {
      company = await Company.findOne({ email: identifier });
    } else if (type === 'mobile') {
      company = await Company.findOne({ mobile: identifier });
    }

    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const otp = await OTPService.generateOTP(company._id, type);

    if (type === 'email') {
      await emailService.sendVerificationEmail(identifier, otp);
    } else if (type === 'mobile') {
      await smsService.sendVerificationCode(identifier, otp);
    }

    res.json({ message: `Verification code resent to your ${type}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
};