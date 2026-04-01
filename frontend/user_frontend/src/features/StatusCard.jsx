import React from "react";

export const StatusCard = ({ icon, title, status }) => (
  <div className="bg-gray-900 backdrop-blur-sm border border-green-900/50 rounded-xl p-6 shadow-lg shadow-green-900/20 hover:border-green-500 transition-colors duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-green-900/20 rounded-lg text-green-400">{icon}</div>
      <h3 className="text-sm font-medium text-green-300">{title}</h3>
    </div>
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          status ? "bg-green-500 animate-pulse" : "bg-gray-600"
        }`}
      />
      <span className="text-lg font-semibold text-white">
        {status ? "Active" : "Inactive"}
      </span>
    </div>
  </div>
);