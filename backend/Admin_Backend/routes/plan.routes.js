import express from 'express';
import { createPlan, getPlans ,addPayment, getPayments ,exportPayments } from '../controllers/plan_payment.controller.js';
import { protect, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

// Admin routes
router.post('/plan', protect, authorize('admin'), createPlan);
router.get('/getplans', protect, authorize('admin'), getPlans);
router.post('/payment', protect, authorize('admin'), addPayment);    // add a payment record
router.get('/transactions', protect, authorize('admin'), getPayments);   // get all payments
router.get('/transactions/export', protect, authorize('admin'), exportPayments); // export to Excel

export default router;
