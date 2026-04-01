import express from 'express';
import { getSettings, updateSettings } from '../controllers/settings.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';
import { validate } from '../middleware/validate.middleware.js';

const router = express.Router();

// Get settings
router.get('/', protect, authorize('admin'), getSettings);

// Update settings
router.put(
  '/',
  protect,
  authorize('admin'),
  [
    body('language').optional().isIn(['en', 'bn', 'hi', 'ta', 'te', 'mr', 'gu', 'kn', 'or', 'pa']).withMessage('Invalid language'),
    body('theme').optional().isIn(['light', 'dark', 'system']).withMessage('Invalid theme'),
    body('newUserAlertSound').optional().isBoolean(),
    body('paymentAlertSound').optional().isBoolean(),
    body('systemAlertSound').optional().isBoolean(),
  ],
  validate,
  updateSettings
);

export default router;
