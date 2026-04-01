import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware.js';
import {
  sendEmailOTP,
  verifyEmailOTP,
  sendSMSOTP,
  verifySMSOTP
} from '../controllers/otp.controller.js';

const router = Router();

// Send Email OTP
router.post(
  '/send-email-otp',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required')
  ],
  validate,
  sendEmailOTP
);

// Verify Email OTP
router.post(
  '/verify-email-otp',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits').isNumeric()
  ],
  validate,
  verifyEmailOTP
);

// Send SMS OTP
router.post(
  '/send-sms-otp',
  [
    body('phoneNumber').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit phone number required')
  ],
  validate,
  sendSMSOTP
);

// Verify SMS OTP
router.post(
  '/verify-sms-otp',
  [
    body('phoneNumber').matches(/^[6-9]\d{9}$/).withMessage('Valid 10-digit phone number required'),
    body('otp').isLength({ min: 6, max: 6 }).withMessage('OTP must be 6 digits').isNumeric()
  ],
  validate,
  verifySMSOTP
);

export default router;

