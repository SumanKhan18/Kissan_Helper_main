import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Leaf, Shield } from 'lucide-react';

function JoinNow() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const plans = [
    {
      id: "basic",
      name: "Basic",
      monthlyPrice: 499,
      yearlyPrice: 4999,
      features: [
        "Basic soil analysis",
        "Crop recommendations",
        "Weather alerts",
        "Email support"
      ]
    },
    {
      id: "premium",
      name: "Premium",
      monthlyPrice: 999,
      yearlyPrice: 9999,
      features: [
        "Advanced soil analysis",
        "Personalized crop recommendations",
        "Pest & disease detection",
        "Market price updates",
        "Priority support"
      ],
      recommended: true
    },
    {
      id: "enterprise",
      name: "Enterprise",
      monthlyPrice: 1999,
      yearlyPrice: 19999,
      features: [
        "Unlimited soil analysis",
        "AI-powered recommendations",
        "Advanced analytics dashboard",
        "Dedicated account manager",
        "Custom integrations",
        "24/7 priority support"
      ]
    }
  ];

  const handlePayment = async (planId) => {
    try {
      const selectedPlan = plans.find(p => p.id === planId);
      const price = billingCycle === 'monthly' ? selectedPlan.monthlyPrice : selectedPlan.yearlyPrice;

      const options = {
        key: "rzp_test_IeBkvfK8cxOZgQ",
        amount: price * 100,
        currency: "INR",
        name: "Kissan Helper",
        description: `${selectedPlan.name} Plan - ${billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Subscription`,
        handler: function (response) {
          console.log(response);
          alert("Payment successful!");
        },
        prefill: {
          name: "",
          email: ""
        },
        theme: {
          color: "#22c55e"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment error:", error);
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-black mt-12">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=1920"
          alt="Farm background"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <div className="flex items-center gap-3">
            <Leaf className="h-8 w-8 text-green-500" />
            <h1 className="text-3xl font-bold text-white">Choose Your Plan</h1>
          </div>

          <div className="mt-6 bg-gray-800 p-1 rounded-full inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'bg-green-500 text-black' : 'text-gray-300'
                }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'bg-green-500 text-black' : 'text-gray-300'
                }`}
            >
              Yearly
              <span className="ml-1 text-xs">(-15%)</span>
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ scale: 1.02 }}
              className={`bg-gray-900 rounded-xl p-6 border-2 flex flex-col ${selectedPlan === plan.id ? 'border-green-500' : 'border-gray-700'
                }`}
            >
              <div className="flex-grow">
                {plan.recommended && (
                  <div className="bg-green-500 text-black text-xs font-bold px-3 py-1 rounded-full inline-block mb-4">
                    Recommended
                  </div>
                )}

                <h2 className="text-2xl font-bold text-white mb-2">{plan.name}</h2>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-white">
                    ₹{billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                  </span>
                  <span className="text-gray-400 ml-2">
                    /{billingCycle === 'monthly' ? 'month' : 'year'}
                  </span>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-300">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePayment(plan.id)}
                className="w-full py-3 rounded-lg font-bold text-lg bg-green-500 text-black hover:bg-green-600 transition-colors mt-auto"
              >
                Make Payment
              </button>
            </motion.div>
          ))}
        </motion.div>
        <div className="mt-12 flex items-center justify-center gap-3">
          <Shield className="w-5 h-5 text-green-500" />
          <p className="text-gray-400 text-sm">
            Secure payment processing with industry-standard encryption
          </p>
        </div>
      </div>
    </div>
  );
}
export default JoinNow;