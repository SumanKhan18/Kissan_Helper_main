import express from 'express';
import { getSystemStatus, toggleMaintenance, scheduleMaintenance, getMaintenanceHistory } from '../controllers/maintenance.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin endpoints
router.get('/status', protect, authorize('admin'), getSystemStatus);
router.post('/toggle', protect, authorize('admin'), toggleMaintenance);
router.post('/schedule', protect, authorize('admin'), scheduleMaintenance);
router.get('/history', protect, authorize('admin'), getMaintenanceHistory);

export default router;
