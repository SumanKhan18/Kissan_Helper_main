import express from 'express';
import { registerWithPayment } from '../controllers/payment.controller.js';
const router = express.Router();

router.post('/register-with-payment', registerWithPayment);


export default router;
