import React, { useState } from "react";

const userShipment= () => {
  const [selectedPlan, setSelectedPlan] = useState("Standard");
  const [products, setProducts] = useState([
    { id: 1, name: "Product A", qty: 2, price: 500 },
    { id: 2, name: "Product B", qty: 1, price: 1200 },
    { id: 3, name: "Product C", qty: 4, price: 300 },
  ]);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");

  const total = products.reduce((acc, p) => acc + p.qty * p.price, 0);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 font-sans p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-green-500 mb-6">
        Shipment & Plan Overview
      </h1>

      {/* Shipment Plan */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">Select Plan</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {["Standard", "Express", "Overnight"].map((plan) => (
            <button
              key={plan}
              onClick={() => setSelectedPlan(plan)}
              className={`px-4 py-3 rounded-lg border transition ${
                selectedPlan === plan
                  ? "bg-green-600 text-white border-green-500"
                  : "bg-gray-900 border-gray-500 hover:border-green-500"
              }`}
            >
              {plan}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Included Products
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left border border-gray-700 rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-gray-300">
              <tr>
                <th className="px-4 py-2">Product</th>
                <th className="px-4 py-2">Quantity</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{p.name}</td>
                  <td className="px-4 py-2">{p.qty}</td>
                  <td className="px-4 py-2">₹{p.price}</td>
                  <td className="px-4 py-2">₹{p.qty * p.price}</td>
                </tr>
              ))}
              <tr className="bg-gray-700 font-semibold">
                <td className="px-4 py-2" colSpan={3}>
                  Total
                </td>
                <td className="px-4 py-2">₹{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Delivery Address */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Delivery Address
        </h2>
        <textarea
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Enter your shipping address"
          className="w-full bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg"
          rows={3}
        />
      </section>

      {/* Payment Method */}
      <section className="bg-gray-800 border border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
        <h2 className="text-2xl font-semibold text-green-600 mb-4">
          Payment Method
        </h2>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full bg-gray-900 text-gray-200 border border-gray-500 px-3 py-2 rounded-lg"
        >
          <option>COD</option>
          <option>Credit Card</option>
          <option>UPI</option>
          <option>Net Banking</option>
        </select>
      </section>

      {/* Confirm Order */}
      <section className="bg-gray-800 border border-green-500 rounded-lg p-6 shadow-sm text-center">
        <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition text-lg font-semibold">
          Confirm & Place Order
        </button>
      </section>
    </div>
  );
};

export default userShipment;
