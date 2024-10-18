// services/smsService.js
const twilio = require('twilio');
const dotenv = require('dotenv');
dotenv.config();

class SMSService {
  constructor() {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;

    if (!accountSid || !authToken) {
      throw new Error('Twilio credentials are not properly configured');
    }

    this.client = twilio(accountSid, authToken);
    this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;

    if (!this.phoneNumber) {
      throw new Error('Twilio phone number is not configured');
    }
  }

  async sendVerificationCode(phoneNumber, otp) {
    try {
      const message = await this.client.messages.create({
        body: `Your verification code is: ${otp}. This code will expire in 10 minutes.`,
        from: this.phoneNumber,
        to: phoneNumber
      });
      console.log(`Verification code sent to ${phoneNumber}. Message SID: ${message.sid}`);
      return message;
    } catch (error) {
      console.error('Error sending SMS:', error);
      throw new Error('Failed to send verification SMS');
    }
  }
}

module.exports = new SMSService();