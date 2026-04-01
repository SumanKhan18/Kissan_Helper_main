import OTP from '../models/otp.model.js';
import { sendOTPEmail } from '../services/emailService.js';
import { sendSMSOTP as sendTwilioOTP, verifySMSOTP as verifyTwilioOTP } from '../services/twilioService.js';

// Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Send Email OTP
export const sendEmailOTP = async (req, res) => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      return res.status(400).json({ success: false, message: 'Email and name are required' });
    }

    // Check if there's an unexpired, unverified OTP
    const existingOTP = await OTP.findOne({
      email,
      type: 'email',
      verified: false,
      expiresAt: { $gt: new Date() }
    });

    let otpCode;
    if (existingOTP) {
      otpCode = existingOTP.otp;
    } else {
      // Generate new OTP
      otpCode = generateOTP();
      
      // Delete old OTPs for this email
      await OTP.deleteMany({ email, type: 'email' });

      // Save new OTP (expires in 10 minutes)
      await OTP.create({
        email,
        otp: otpCode,
        type: 'email',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });
    }

    // Send OTP via EmailJS
    const emailSent = await sendOTPEmail(email, otpCode, name);
    
    if (!emailSent) {
      return res.status(500).json({ success: false, message: 'Failed to send OTP email' });
    }

    res.json({
      success: true,
      message: 'OTP sent to email successfully',
      expiresIn: 600 // seconds
    });

  } catch (error) {
    console.error('Send Email OTP Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to send OTP' });
  }
};

// Verify Email OTP
export const verifyEmailOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ success: false, message: 'Email and OTP are required' });
    }

    const otpRecord = await OTP.findOne({
      email,
      type: 'email',
      otp,
      verified: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    res.json({
      success: true,
      message: 'Email OTP verified successfully'
    });

  } catch (error) {
    console.error('Verify Email OTP Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to verify OTP' });
  }
};

// Send SMS OTP
export const sendSMSOTP = async (req, res) => {
  try {
    const { phoneNumber } = req.body;

    if (!phoneNumber) {
      return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    // Validate phone format (10 digits)
    if (!/^[6-9]\d{9}$/.test(phoneNumber)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format' });
    }

    // Check if there's an unexpired, unverified OTP
    const existingOTP = await OTP.findOne({
      phone: phoneNumber,
      type: 'sms',
      verified: false,
      expiresAt: { $gt: new Date() }
    });

    if (existingOTP) {
      // Resend existing OTP via Twilio
      const smsSent = await sendTwilioOTP(phoneNumber);
      if (!smsSent.success) {
        return res.status(500).json({ success: false, message: smsSent.error || 'Failed to send SMS OTP' });
      }
    } else {
      // Generate new OTP
      const otpCode = generateOTP();
      
      // Delete old OTPs for this phone
      await OTP.deleteMany({ phone: phoneNumber, type: 'sms' });

      // Save new OTP (expires in 10 minutes)
      await OTP.create({
        phone: phoneNumber,
        otp: otpCode,
        type: 'sms',
        expiresAt: new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
      });

      // Send OTP via Twilio
      const smsSent = await sendTwilioOTP(phoneNumber);
      if (!smsSent.success) {
        return res.status(500).json({ success: false, message: smsSent.error || 'Failed to send SMS OTP' });
      }
    }

    res.json({
      success: true,
      message: 'OTP sent to phone successfully',
      expiresIn: 600 // seconds
    });

  } catch (error) {
    console.error('Send SMS OTP Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to send OTP' });
  }
};

// Verify SMS OTP
export const verifySMSOTP = async (req, res) => {
  try {
    const { phoneNumber, otp } = req.body;

    if (!phoneNumber || !otp) {
      return res.status(400).json({ success: false, message: 'Phone number and OTP are required' });
    }

    // First try to verify with Twilio (if using Twilio Verify service)
    const twilioVerify = await verifyTwilioOTP(phoneNumber, otp);
    
    if (twilioVerify.success) {
      // If Twilio verification succeeds, mark OTP as verified in DB
      await OTP.updateMany(
        { phone: phoneNumber, type: 'sms', verified: false },
        { verified: true }
      );
      
      return res.json({
        success: true,
        message: 'SMS OTP verified successfully'
      });
    }

    // Fallback: Verify against database
    const otpRecord = await OTP.findOne({
      phone: phoneNumber,
      type: 'sms',
      otp,
      verified: false,
      expiresAt: { $gt: new Date() }
    });

    if (!otpRecord) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Mark OTP as verified
    otpRecord.verified = true;
    await otpRecord.save();

    res.json({
      success: true,
      message: 'SMS OTP verified successfully'
    });

  } catch (error) {
    console.error('Verify SMS OTP Error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to verify OTP' });
  }
};

