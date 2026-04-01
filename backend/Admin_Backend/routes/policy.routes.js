import express from 'express';
import { addPolicy, getPolicies, getPolicy, updatePolicy, deletePolicy } from '../controllers/policy.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin only routes
router.post('/', protect, authorize('admin'), addPolicy);
router.put('/:id', protect, authorize('admin'), updatePolicy);
router.delete('/:id', protect, authorize('admin'), deletePolicy);

// Public or admin can fetch policies
router.get('/', protect, getPolicies);
router.get('/:id', protect, getPolicy);

export default router;
