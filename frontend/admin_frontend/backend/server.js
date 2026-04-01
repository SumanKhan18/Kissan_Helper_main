const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');
const validator = require('validator');
require('dotenv').config();

const twilioService = require('./services/twilioService');
const { validatePhoneNumber, formatPhoneNumber } = require('./utils/phoneUtils');

const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:5175'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting for SMS endpoints
const smsRateLimit = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 5, // limit each IP to 5 requests per windowMs
  message: {
    success: false,
    error: 'Too many SMS requests from this IP, please try again later.',
    retryAfter: Math.ceil((parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000) / 1000)
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'KissanHelper Backend API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV
  });
});

// Send SMS OTP endpoint
app.post('/api/send-sms-otp', 
  smsRateLimit,
  [
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .custom((value) => {
        if (!validatePhoneNumber(value)) {
          throw new Error('Invalid phone number format');
        }
        return true;
      })
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { phoneNumber } = req.body;
      const formattedPhone = formatPhoneNumber(phoneNumber);

      console.log(`📱 SMS OTP Request: ${formattedPhone} from IP: ${req.ip}`);

      const result = await twilioService.sendVerificationCode(formattedPhone);

      if (result.success) {
        console.log(`✅ SMS OTP sent successfully to ${formattedPhone}`);
        res.json({
          success: true,
          message: 'OTP sent successfully',
          sid: result.sid,
          phoneNumber: formattedPhone
        });
      } else {
        console.error(`❌ Failed to send SMS OTP to ${formattedPhone}:`, result.error);
        res.status(400).json({
          success: false,
          error: result.error || 'Failed to send SMS OTP'
        });
      }
    } catch (error) {
      console.error('❌ SMS OTP Send Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while sending SMS OTP'
      });
    }
  }
);

// Verify SMS OTP endpoint
app.post('/api/verify-sms-otp',
  smsRateLimit,
  [
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .custom((value) => {
        if (!validatePhoneNumber(value)) {
          throw new Error('Invalid phone number format');
        }
        return true;
      }),
    body('otp')
      .notEmpty()
      .withMessage('OTP is required')
      .isLength({ min: 6, max: 6 })
      .withMessage('OTP must be 6 digits')
      .isNumeric()
      .withMessage('OTP must contain only numbers')
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { phoneNumber, otp } = req.body;
      const formattedPhone = formatPhoneNumber(phoneNumber);

      console.log(`🔍 SMS OTP Verification: ${formattedPhone} with OTP: ${otp} from IP: ${req.ip}`);

      const result = await twilioService.verifyCode(formattedPhone, otp);

      if (result.success) {
        console.log(`✅ SMS OTP verified successfully for ${formattedPhone}`);
        res.json({
          success: true,
          message: 'OTP verified successfully',
          phoneNumber: formattedPhone
        });
      } else {
        console.error(`❌ SMS OTP verification failed for ${formattedPhone}:`, result.error);
        res.status(400).json({
          success: false,
          error: result.error || 'Invalid OTP'
        });
      }
    } catch (error) {
      console.error('❌ SMS OTP Verification Error:', error);
      res.status(500).json({
        success: false,
        error: 'Internal server error while verifying SMS OTP'
      });
    }
  }
);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Unhandled Error:', err);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { details: err.message })
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
    availableEndpoints: [
      'GET /health',
      'POST /api/send-sms-otp',
      'POST /api/verify-sms-otp'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 KissanHelper Backend Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
  console.log(`🔗 Frontend URL: ${'http://localhost:5173'}`);
  console.log(`📱 Twilio Service SID: ${process.env.TWILIO_VERIFY_SERVICE_SID}`);
  console.log(`⚡ Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('👋 SIGTERM received, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('👋 SIGINT received, shutting down gracefully');
  process.exit(0);
});

// const registerAdmin = async (req, res) => {
//   const { recaptchaToken, ...formData } = req.body;

//   // 🔒 Step 1: Validate reCAPTCHA with Google
//   try {
//     const recaptchaRes = await axios.post(
//       `https://www.google.com/recaptcha/api/siteverify`,
//       null,
//       {
//         params: {
//           secret: process.env.RECAPTCHA_SECRET_KEY, // You set this in your .env
//           response: recaptchaToken,
//         },
//       }
//     );

//     if (!recaptchaRes.data.success) {
//       return res.status(400).json({ message: "Failed reCAPTCHA verification" });
//     }

//     // ✅ Step 2: Proceed with registration logic
//     // Save user/admin to database, send email, etc.
//     return res.status(200).json({ message: "Registration successful" });

//   } catch (error) {
//     console.error("reCAPTCHA error:", error);
//     return res.status(500).json({ message: "Internal Server Error" });
//   }
// };