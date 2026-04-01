import express from 'express';
import {
  getOverview,
  getUserActivity,
  getRevenue,
  getPlanDistribution,
  getRecentActivities
} from '../controllers/dashboard.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin only
router.get('/overview', protect, authorize('admin'), getOverview);
router.get('/user-activity', protect, authorize('admin'), getUserActivity);
router.get('/revenue', protect, authorize('admin'), getRevenue);
router.get('/plan-distribution', protect, authorize('admin'), getPlanDistribution);
router.get('/recent-activities', protect, authorize('admin'), getRecentActivities);

export default router;
