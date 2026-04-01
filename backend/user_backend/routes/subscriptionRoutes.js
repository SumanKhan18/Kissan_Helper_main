import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import {
  listPlans,
  createOrder,
  verifyPayment,
  razorpayWebhook,
  getUserTransactions
} from '../controllers/subscriptionController.js';

const router = express.Router();

router.get('/plans', listPlans);

// protected: create order, verify, get transactions
router.post('/create-order', authMiddleware, createOrder);
router.post('/verify-payment', authMiddleware, verifyPayment); // optional (frontend calls)
router.post('/webhook', express.json({type: '*/*'}), razorpayWebhook); // webhook should not use authMiddleware
router.get('/my-transactions', authMiddleware, getUserTransactions);

export default router;
