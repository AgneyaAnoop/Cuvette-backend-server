// services/emailService.js
const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
dotenv.config();

class EmailService {
  constructor() {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async sendVerificationEmail(to, otp) {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Email Verification',
      html: `<p>Your email verification code is: <strong>${otp}</strong></p>
             <p>This code will expire in 10 minutes.</p>`
    };

    try {
      await sgMail.send(msg);
      console.log('Verification email sent successfully');
    } catch (error) {
      console.error('Error sending verification email:', error);
      if (error.response) {
        console.error(error.response.body);
      }
      throw new Error('Failed to send verification email');
    }
  }

  async sendJobAlerts(to, job) {
    const msg = {
      to,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: `New Job Alert: ${job.title}`,
      html: `
        <h1>${job.title}</h1>
        <p>${job.description}</p>
        <p><strong>Experience Level:</strong> ${job.experienceLevel}</p>
        <p><strong>End Date:</strong> ${job.endDate}</p>
        <p><strong>Company:</strong> ${job.company.name}</p>
        <p>Log in to your account for more details and to apply.</p>
      `
    };

    try {
      await sgMail.send(msg);
      console.log(`Job alert sent successfully to ${to}`);
    } catch (error) {
      console.error(`Error sending job alert to ${to}:`, error);
      if (error.response) {
        console.error(error.response.body);
      }
      throw new Error('Failed to send job alert');
    }
  }
}

module.exports = new EmailService();