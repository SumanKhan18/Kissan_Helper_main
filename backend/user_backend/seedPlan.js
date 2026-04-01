import mongoose from "mongoose";
import dotenv from "dotenv";
import Plan from "./models/Plan.js";

dotenv.config();

const plans = [
  {
    name: "Basic Monthly",
    priceINR: 499,
    billingCycleDays: 30,
    features: ["Feature A", "Feature B"],
    active: true,
  },
  {
    name: "Basic Yearly",
    priceINR: 4990,
    billingCycleDays: 365,
    features: ["Feature A", "Feature B", "Discounted pricing"],
    active: true,
  },
  {
    name: "Premium Monthly",
    priceINR: 999,
    billingCycleDays: 30,
    features: ["Feature A", "Feature B", "Premium Support"],
    active: true,
  },
  {
    name: "Premium Yearly",
    priceINR: 9990,
    billingCycleDays: 365,
    features: [
      "Feature A",
      "Feature B",
      "Premium Support",
      "Discounted pricing",
    ],
    active: true,
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("Connected to MongoDB ✅");

    await Plan.deleteMany({});
    await Plan.insertMany(plans);

    console.log("Plans seeded successfully 🚀");
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });
