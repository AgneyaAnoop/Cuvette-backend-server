const crypto = require('crypto');

class OTPService {
    static async generateOTP(companyId, type) {
      const otp = crypto.randomInt(100000, 999999).toString();
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
      await OTP.create({
        company: companyId,
        otp,
        type,
        expiresAt
      });
  
      return otp;
    }
  
    static async verifyOTP(companyId, otp, type) {
      const otpRecord = await OTP.findOne({
        company: companyId,
        otp,
        type,
        expiresAt: { $gt: new Date() }
      });
  
      if (!otpRecord) {
        throw new Error('Invalid or expired OTP');
      }
  
      await OTP.deleteMany({ company: companyId, type });
  
      return true;
    }
  }
  
  module.exports = OTPService;