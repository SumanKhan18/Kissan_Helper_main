import Payment from '../models/payment.model.js';
import Plan from '../models/plan.model.js';
import XLSX from 'xlsx';

// ==========================
// Create a new plan (Admin)
// ==========================
export const createPlan = async (req, res) => {
  try {
    const { name, price, description } = req.body;

    // Check if plan already exists
    const existingPlan = await Plan.findOne({ name });
    if (existingPlan) {
      return res.status(400).json({ success: false, message: 'Plan already exists' });
    }

    const plan = await Plan.create({ name, price, description });
    res.status(201).json({ success: true, message: 'Plan created', plan });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// Record a payment transaction
// ==========================
export const addPayment = async (req, res) => {
  try {
    const { transactionId, userName, userEmail, plan, amount, status } = req.body;

    const payment = await Payment.create({
      transactionId,
      userName,
      userEmail,
      plan,
      amount,
      status: status || 'completed', // default to completed
      date: new Date()
    });

    res.status(201).json({ success: true, message: 'Payment recorded', payment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ==========================
// Get all payments with filters
// ==========================
export const getPayments = async (req, res) => {
  try {
    const { search, status, plan } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { userName: { $regex: search, $options: 'i' } },
        { userEmail: { $regex: search, $options: 'i' } },
        { transactionId: { $regex: search, $options: 'i' } }
      ];
    }

    if (status) query.status = status;
    if (plan) query.plan = plan;

    const payments = await Payment.find(query).sort({ date: -1 });
    res.json({ success: true, payments });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==========================
// Get all plans
// ==========================
export const getPlans = async (req, res) => {
  try {
    const plans = await Plan.find().sort({ createdAt: -1 });
    res.json({ success: true, plans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// ==========================
// Export payments to Excel
// ==========================
export const exportPayments = async (req, res) => {
  try {
    const payments = await Payment.find().sort({ date: -1 });

    const data = payments.map(p => ({
      TransactionID: p.transactionId,
      Customer: p.userName,
      Email: p.userEmail,
      Amount: p.amount,
      Date: p.date.toLocaleDateString(),
      Status: p.status,
      Plan: p.plan
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');

    const buffer = XLSX.write(wb, { type: 'buffer', bookType: 'xlsx' });

    res.setHeader(
      'Content-Disposition',
      'attachment; filename="payments.xlsx"'
    );
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.send(buffer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
