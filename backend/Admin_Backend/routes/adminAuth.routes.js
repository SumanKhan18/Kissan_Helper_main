import { Router } from 'express';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware.js';
import { registerAdmin, loginAdmin, getProfile, updateAdminStatus, updateProfile, getCurrentAdmin, getAllAdmins } from '../controllers/adminAuth.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import upload from '../middleware/upload.middleware.js';
import { registerWithPayment } from '../controllers/payment.controller.js';
import { adminLogout } from '../controllers/adminAuth.controller.js';

const router = Router();

router.post(
  '/register',
  upload.fields([
    { name: 'aadhaarImage', maxCount: 1 },
    { name: 'personalImage', maxCount: 1 }
  ]),
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 chars'),
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('phone').matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 chars'),
    body('confirmPassword').custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Passwords do not match');
      }
      return true;
    }),
    body('aadhaarNumber').notEmpty().withMessage('Aadhaar number is required'),
    body('address').notEmpty().withMessage('Address is required'),
    body('amount').isNumeric().withMessage('Amount is required for payment'),
    body('razorpay_payment_id').optional(),
    body('razorpay_order_id').optional(),
    body('razorpay_signature').optional()
  ],
  validate,
  registerWithPayment
);


// ✅ Login route
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email required').normalizeEmail(),
    body('password').notEmpty().withMessage('Password required')
  ],
  validate,
  loginAdmin
);

// ✅ Get profile route
router.get('/profile', protect, getProfile);

// ✅ Get current admin with online status
router.get('/current', protect, getCurrentAdmin);

// ✅ Get all admins with online status
router.get('/all', protect, getAllAdmins);

// ✅ Update profile route
router.put(
  '/profile',
  protect,
  upload.fields([
    { name: 'aadhaarImage', maxCount: 1 },
    { name: 'personalImage', maxCount: 1 }
  ]),
  [
    body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 chars'),
    body('email').optional().isEmail().withMessage('Valid email required').normalizeEmail(),
    body('phone').optional().matches(/^[0-9]{10}$/).withMessage('Phone number must be 10 digits'),
    body('address').optional().trim().notEmpty().withMessage('Address cannot be empty'),
    body('currentPassword').optional().notEmpty().withMessage('Current password required'),
    body('newPassword').optional().isLength({ min: 6 }).withMessage('New password must be at least 6 chars'),
  ],
  validate,
  updateProfile
);

// ✅ Update admin status (only superadmin)
router.put('/:id/status', protect, authorize('superadmin'), updateAdminStatus);

// Logout
router.post("/logout", adminLogout);

export default router;
