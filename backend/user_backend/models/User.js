import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  razorpayPaymentId: { type: String },
  razorpayOrderId: { type: String },
  amount: { type: Number }, // in paise
  currency: { type: String, default: "INR" },
  planName: { type: String }, 
  date: { type: Date, default: Date.now },
  status: { type: String, enum: ["success", "failed"], default: "success" },
});

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  googleId: { type: String }, 

  // Profile details
  profilePhoto: { type: String, default: "" },
  phone: { type: String, default: "" },
  location: { type: String, default: "" },

  // Subscription details
  currentPlan: {
    type: String,
    enum: ["Basic", "Premium", "Enterprise", "Free"],
  },
  planStartDate: { type: Date },
  planEndDate: { type: Date },

  // Transaction history
  transactions: [transactionSchema],

  // Notes created by the user
  notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
}, { timestamps: true }); 

// ✅ Virtual field for joined date
userSchema.virtual("joinedDate").get(function () {
  return this.createdAt ? this.createdAt.toISOString().split("T")[0] : null;
});

// ✅ Virtual field for profile picture URL
userSchema.virtual("profilePic").get(function () {
  if (!this.profilePhoto) return "/default-avatar.png";
  return `${process.env.BASE_URL || "http://localhost:3000"}/uploads/${this.profilePhoto}`;
});

userSchema.set("toJSON", { virtuals: true });

const User = mongoose.model("User", userSchema);
export default User;
