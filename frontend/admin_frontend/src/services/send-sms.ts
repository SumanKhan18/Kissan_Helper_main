// server.js

import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import twilio from 'twilio';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Load Twilio credentials from .env
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceSid = process.env.SERVICE_SID;

const client = twilio(accountSid, authToken);

// Middleware
app.use(cors());
app.use(express.json());

// Route: Send SMS OTP
app.post('/api/send-sms-otp', async (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).json({ success: false, error: 'Phone number is required' });
  }

  try {
    const verification = await client.verify.v2.services(serviceSid).verifications.create({
      to: `+91${phoneNumber}`,
      channel: 'sms'
    });

    console.log('OTP sent to:', phoneNumber);
    res.json({ success: true, status: verification.status });
  } catch (error) {
    console.error('Twilio Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route: Verify SMS OTP
app.post('/api/verify-sms-otp', async (req, res) => {
  const { phoneNumber, otp } = req.body;

  if (!phoneNumber || !otp) {
    return res.status(400).json({ success: false, error: 'Phone number and OTP are required' });
  }

  try {
    const verificationCheck = await client.verify.v2.services(serviceSid).verificationChecks.create({
      to: `+91${phoneNumber}`,
      code: otp
    });

    if (verificationCheck.status === 'approved') {
      res.json({ success: true });
    } else {
      res.json({ success: false, error: 'Invalid or expired OTP' });
    }
  } catch (error) {
    console.error('Twilio Verification Error:', error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
