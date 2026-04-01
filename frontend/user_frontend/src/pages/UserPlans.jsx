import { useState, useEffect } from "react";
import { Check, AlertCircle } from "lucide-react";
import API from "../api"; // preconfigured axios instance
import { loadRazorpay } from "../utils/loadRazorpay";

export default function UserPlans() {
  const [user, setUser] = useState(null);
  const [plans, setPlans] = useState([]);
  const [loadingPlanId, setLoadingPlanId] = useState(null);
  const [error, setError] = useState("");

  // Fetch current subscription and available plans
  useEffect(() => {
    const fetchData = async () => {
      const token =
        localStorage.getItem("token") || sessionStorage.getItem("token");
      if (!token) {
        setError("You are not logged in.");
        return;
      }

      try {
        // 1️⃣ Fetch current subscription
        const subRes = await API.get("/subscriptions/my-transactions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const subscription = subRes.data.subscription;

        setUser({
          currentPlan: subscription?.plan || "None",
          planExpiry: subscription
            ? new Date(subscription.validUntil).toLocaleDateString()
            : "N/A",
        });

        // 2️⃣ Fetch all available plans
        const plansRes = await API.get("/subscriptions/plans", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPlans(plansRes.data.plans);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 401)
          setError("Unauthorized. Please login again.");
        else setError("Failed to fetch data.");
      }
    };

    fetchData();
  }, []);

  // Handle plan upgrade/payment
  const handleUpgrade = async (planId) => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to upgrade.");
      return;
    }

    setLoadingPlanId(planId);

    // Load Razorpay SDK
    const razorpayLoaded = await loadRazorpay();
    if (!razorpayLoaded) {
      alert("Razorpay SDK failed to load. Check your internet connection.");
      setLoadingPlanId(null);
      return;
    }

    try {
      // 1️⃣ Create order on backend
      const { data } = await API.post(
        "/subscriptions/create-order",
        { planId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const { order, transactionId } = data;

      // 2️⃣ Configure Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "Your App Name",
        description: "Plan purchase",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3️⃣ Verify payment in backend
            await API.post(
              "/subscriptions/verify-payment",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                transactionId,
              },
              { headers: { Authorization: `Bearer ${token}` } }
            );

            alert("Payment successful!");
            // Refresh subscription info after payment
            const subRes = await API.get("/subscriptions/my-transactions", {
              headers: { Authorization: `Bearer ${token}` },
            });
            const subscription = subRes.data.subscription;
            setUser({
              currentPlan: subscription?.plan || "None",
              planExpiry: subscription
                ? new Date(subscription.validUntil).toLocaleDateString()
                : "N/A",
            });
          } catch (err) {
            console.error("Payment verification failed:", err);
            alert("Payment verification failed. Contact support.");
          }
        },
        prefill: {
          name: "Your Name",
          email: "email@example.com",
        },
        theme: { color: "#3399cc" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment error:", err);
      alert("Payment failed. Please try again.");
    } finally {
      setLoadingPlanId(null);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!user || !plans.length) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-green-500 mb-4">
        Subscription Plans
      </h1>

      {/* Current Plan */}
      <div className="mb-8 bg-gray-900 border border-blue-200 rounded-lg p-4 flex items-start">
        <AlertCircle className="w-5 h-5 text-green-600 mt-0.5" />
        <div className="ml-3">
          <h3 className="text-sm font-medium text-green-500">
            Your current plan: {user.currentPlan}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Valid until {user.planExpiry}
          </p>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => {
          const isCurrent = plan.name === user.currentPlan;
          return (
            <div
              key={plan._id}
              className={`relative bg-gray-900 hover:bg-gray-800 rounded-lg shadow-sm border ${
                isCurrent ? "border-blue-500" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                  Popular
                </div>
              )}
              <div className="p-6">
                <h3 className="text-lg font-medium text-green-600">
                  {plan.name}
                </h3>
                <p className="mt-2 text-gray-400">{plan.description}</p>
                <p className="mt-4 text-3xl font-bold text-green-500">
                  ₹{plan.priceINR} / {plan.billingCycleDays} days
                </p>

                <ul className="mt-6 space-y-2">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5" />
                      <span className="ml-2 text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  disabled={isCurrent || loadingPlanId === plan._id}
                  onClick={() => handleUpgrade(plan._id)}
                  className={`mt-6 w-full py-3 rounded-lg font-medium ${
                    isCurrent
                      ? "bg-gray-100 text-gray-500 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-gray-500"
                  }`}
                >
                  {isCurrent
                    ? "Current Plan"
                    : loadingPlanId === plan._id
                    ? "Processing..."
                    : "Upgrade Plan"}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 
