import Plan from "../models/Plan.js";
import Transaction from "../models/Transaction.js";
import User from "../models/User.js";
import razorpay from "../utils/razorpay.js";
import crypto from "crypto";

// List plans
export const listPlans = async (req, res) => {
  const plans = await Plan.find({ active: true });
  // console.log(plans)
  res.json({ plans });
};

// Create Razorpay order (frontend calls this before invoking Razorpay Checkout)
export const createOrder = async (req, res) => {
  try {
    const { planId } = req.body;
    const plan = await Plan.findById(planId);
    // console.log(plan)
    if (!plan) return res.status(404).json({ message: "Plan not found" });

    // Razorpay expects amount in paise (INR * 100)
    const amountPaise = plan.priceINR * 100;

    const options = {
      amount: amountPaise,
      currency: plan.currency || "INR",
      receipt: `rcpt_${Date.now()}`,
      payment_capture: 1, // auto-capture
    };

    const order = await razorpay.orders.create(options);

    // create a Transaction record with status 'created'
    const transaction = await Transaction.create({
      user: req.user._id,
      plan: plan._id,
      razorpayOrderId: order.id,
      amount: amountPaise,
      currency: options.currency,
      status: "created",
    });

    // attach transaction id to response if you want
    res.json({ order, transactionId: transaction._id });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Failed to create order", error: err.message });
  }
};

// Verify payment sent from frontend after checkout (recommended to call)
export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      transactionId,
    } = req.body;

    // Compute expected signature
    const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET);
    hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
    const generated_signature = hmac.digest("hex");

    if (generated_signature !== razorpay_signature) {
      // mark transaction failed
      if (transactionId)
        await Transaction.findByIdAndUpdate(transactionId, {
          status: "failed",
        });
      return res.status(400).json({ message: "Invalid signature" });
    }

    // mark transaction paid
    const t = await Transaction.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: "paid",
      },
      { new: true }
    );

    // update user's subscription: set plan and validUntil = now + billingCycleDays

    //ekhnae change ache
if (t && t.plan) {
  const plan = await Plan.findById(t.plan);
  const validUntil = new Date();
  validUntil.setDate(validUntil.getDate() + (plan.billingCycleDays || 30));

  await User.findByIdAndUpdate(t.user, {
    currentPlan: plan.name,               // <-- ADD THIS
    subscription: { plan: plan._id, validUntil },
    $push: { transactions: t._id },       // combine push here
  });
}


    res.json({ message: "Payment verified and subscription updated" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ message: "Verification failed", error: err.message });
  }
};

// Webhook endpoint (Razorpay will POST events here)
export const razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;
    const signature = req.headers["x-razorpay-signature"];
    const body = JSON.stringify(req.body);

    const expected = crypto
      .createHmac("sha256", secret)
      .update(body)
      .digest("hex");
    if (expected !== signature) {
      return res.status(400).send("Invalid signature");
    }

    const event = req.body.event;
    const payload = req.body.payload;

    // example: payment.captured or payment.failed
    if (event === "payment.captured") {
      const payment = payload.payment.entity;
      const orderId = payment.order_id;
      const paymentId = payment.id;

      // update transaction
      const t = await Transaction.findOneAndUpdate(
        { razorpayOrderId: orderId },
        {
          razorpayPaymentId: paymentId,
          status: "paid",
          amount: payment.amount,
          currency: payment.currency,
        },
        { new: true }
      );
if (t && t.plan) {
  const plan = await Plan.findById(t.plan);
  const validUntil = new Date();
  validUntil.setDate(
    validUntil.getDate() + (plan.billingCycleDays || 30)
  );
  await User.findByIdAndUpdate(t.user, {
    currentPlan: plan.name,               // <-- ADD THIS
    subscription: { plan: plan._id, validUntil },
    $push: { transactions: t._id },       // combine push here
  });
}

    }

    if (event === "payment.failed") {
      const payment = payload.payment.entity;
      const orderId = payment.order_id;
      await Transaction.findOneAndUpdate(
        { razorpayOrderId: orderId },
        { status: "failed" }
      );
    }

    // acknowledge
    res.json({ status: "ok" });
  } catch (err) {
    console.error("Webhook error", err);
    res.status(500).send("error");
  }
};

// Fetch user's transactions & subscription
export const getUserTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id })
      .populate('plan', 'name duration price') // so plan.name works
      .sort({ createdAt: -1 });

    // pick the latest paid transaction as active subscription
    const activeTx = transactions.find(tx => tx.status === 'paid');

    res.json({
      subscription: activeTx
        ? {
            plan: activeTx.plan.name, // this is now the name string
            validUntil: new Date(activeTx.createdAt).setDate(
              activeTx.createdAt.getDate() + (activeTx.plan.duration || 30)
            )
          }
        : null,
      transactions
    });
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ error: "Server error fetching transactions" });
  }
};
  


