import dotenv from 'dotenv';
dotenv.config();

/**
 * Sends an OTP email to the user.
 * For now, this is a placeholder. You should integrate with:
 * - Nodemailer (Gmail, SMTP)
 * - SendGrid
 * - AWS SES
 * - Or EmailJS server-side package
 * 
 * @param {string} email - Recipient email
 * @param {string} otp - OTP code
 * @param {string} fullName - Recipient name
 * @returns {Promise<boolean>} - Success status
 */
export const sendOTPEmail = async (email, otp, fullName) => {
  try {
    // TODO: Implement actual email sending service
    // For development, we'll log and return true
    // In production, replace this with actual email service
    
    console.log('📧 [DEV MODE] OTP Email would be sent:', {
      to: email,
      name: fullName,
      otp: otp,
      message: `Your OTP for KissanHelper admin registration is: ${otp}. This OTP is valid for 10 minutes.`
    });
    
    // Example with Nodemailer (uncomment and configure):
    /*
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'KissanHelper Admin Registration - OTP Verification',
      html: `
        <h2>Hello ${fullName},</h2>
        <p>Your OTP for KissanHelper admin registration is: <strong>${otp}</strong></p>
        <p>This OTP is valid for 10 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      `
    });
    */
    
    // For development: return true to allow testing
    // In production, return true only after successful email send
    return true;
    
  } catch (error) {
    console.error('❌ Error sending OTP email:', error);
    return false;
  }
};

