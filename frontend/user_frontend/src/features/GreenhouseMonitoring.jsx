import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Leaf, Thermometer, Wind, Lightbulb, Sprout } from "lucide-react";

const socket = io("http://localhost:5000");

// Crop Recommendation Logic
const getCropRecommendation = (light, temperature, gas) => {
  // Define optimal ranges for different crops
  const cropConditions = [
    {
      name: "Tomatoes",
      lightMin: 500,
      lightMax: 2000,
      tempMin: 18,
      tempMax: 30,
      gasMax: 1000,
      description:
        "Ideal for warm, well-lit environments with moderate humidity.",
      suitability: 0,
    },
    {
      name: "Lettuce",
      lightMin: 200,
      lightMax: 1000,
      tempMin: 10,
      tempMax: 20,
      gasMax: 800,
      description: "Thrives in cooler conditions with moderate light.",
      suitability: 0,
    },
    {
      name: "Basil",
      lightMin: 600,
      lightMax: 1800,
      tempMin: 20,
      tempMax: 35,
      gasMax: 1200,
      description: "Loves warmth and bright, indirect light.",
      suitability: 0,
    },
    {
      name: "Spinach",
      lightMin: 300,
      lightMax: 800,
      tempMin: 7,
      tempMax: 24,
      gasMax: 700,
      description: "Prefers cooler temperatures and moderate light.",
      suitability: 0,
    },
    {
      name: "Peppers",
      lightMin: 600,
      lightMax: 2200,
      tempMin: 18,
      tempMax: 32,
      gasMax: 1100,
      description: "Requires high light intensity and warm conditions.",
      suitability: 0,
    },
  ];

  // Calculate suitability for each crop
  const evaluatedCrops = cropConditions.map((crop) => {
    let suitability = 0;

    // Light intensity suitability
    if (light >= crop.lightMin && light <= crop.lightMax) {
      suitability += 0.3;
    }

    // Temperature suitability
    if (temperature >= crop.tempMin && temperature <= crop.tempMax) {
      suitability += 0.3;
    }

    // Gas level suitability
    if (gas <= crop.gasMax) {
      suitability += 0.4;
    }

    return { ...crop, suitability };
  });

  // Sort crops by suitability in descending order
  const sortedCrops = evaluatedCrops.sort(
    (a, b) => b.suitability - a.suitability
  );

  return sortedCrops;
};

const App = () => {
  const [sensorData, setSensorData] = useState([]);
  const [latestData, setLatestData] = useState({
    light: 0,
    temperature: 0,
    gas: 0,
    artificial_light: false,
    white_led: false,
  });
  const [cropRecommendations, setCropRecommendations] = useState([]);

  useEffect(() => {
    socket.on("sensorData", (data) => {
      // Update latest data
      setLatestData(data);

      // Update sensor data for graph (keep last 20 entries)
      setSensorData((prev) => {
        const newData = [
          ...prev,
          { ...data, time: new Date().toLocaleTimeString() },
        ];
        return newData.slice(-20);
      });

      // Calculate crop recommendations
      const recommendations = getCropRecommendation(
        data.light,
        data.temperature,
        data.gas
      );
      setCropRecommendations(recommendations);
    });

    return () => socket.off("sensorData");
  }, []);

  return (
    <div className="min-h-screen bg-matrix bg-cover bg-center bg-fixed relative pt-10">
      <div className="absolute inset-0 bg-black/70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 border-b border-green-900/50 pb-6 animate-fade-in">
          <div className="flex items-center gap-3">
            <Leaf className="w-10 h-10 text-green-500 animate-pulse-slow" />
            <h1 className="text-4xl font-bold bg-gradient-to-r text-green-400 bg-clip-text ">
              Smart Greenhouse Monitor
            </h1>
          </div>
          <div className="text-right">
            <p className="text-green-500">Live Monitoring System</p>
            <p className="text-sm text-green-600">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Sensor Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {[
            {
              icon: <Lightbulb className="w-6 h-6" />,
              title: "Light Intensity",
              value: latestData.light,
              unit: "lx",
              delay: "100",
            },
            {
              icon: <Thermometer className="w-6 h-6" />,
              title: "Temperature",
              value: latestData.temperature,
              unit: "°C",
              delay: "200",
            },
            {
              icon: <Wind className="w-6 h-6" />,
              title: "Gas Level",
              value: latestData.gas,
              unit: "ppm",
              delay: "300",
            },
          ].map((sensor, index) => (
            <div
              key={index}
              className="animate-fade-in"
              style={{ animationDelay: `${sensor.delay}ms` }}
            >
              <SensorCard {...sensor} />
            </div>
          ))}
          <div className="animate-fade-in" style={{ animationDelay: "400ms" }}>
            <StatusCard
              icon={<Lightbulb className="w-6 h-6" />}
              title="Artificial Light"
              status={latestData.artificial_light}
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "500ms" }}>
            <StatusCard
              icon={<Lightbulb className="w-6 h-6" />}
              title="White LED"
              status={latestData.white_led}
            />
          </div>
        </div>

        {/* Chart Section */}
        <div
          className="bg-gray-900 backdrop-blur-sm border border-green-900/50 rounded-xl p-6 shadow-lg shadow-green-900/20 animate-fade-in mb-6"
          style={{ animationDelay: "600ms" }}
        >
          <h2 className="text-xl font-semibold mb-6 text-green-400 flex items-center gap-2">
            <Leaf className="w-5 h-5" />
            Sensor Data Trends
          </h2>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sensorData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="rgba(74, 222, 128, 0.1)"
                />
                <XAxis
                  dataKey="time"
                  stroke="#4ade80"
                  tick={{ fill: "#4ade80" }}
                  tickLine={{ stroke: "#4ade80" }}
                />
                <YAxis
                  stroke="#4ade80"
                  tick={{ fill: "#4ade80" }}
                  tickLine={{ stroke: "#4ade80" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    border: "1px solid #4ade80",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="light"
                  stroke="#4ade80"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#f87171"
                  strokeWidth={2}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="gas"
                  stroke="#facc15"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Crop Recommendation Section */}
        <div
          className="bg-gray-900 backdrop-blur-sm border border-green-900/50 rounded-xl p-6 shadow-lg shadow-green-900/20 animate-fade-in"
          style={{ animationDelay: "700ms" }}
        >
          <h2 className="text-xl font-semibold mb-6 text-green-400 flex items-center gap-2">
            <Sprout className="w-5 h-5" />
            Crop Recommendations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cropRecommendations.slice(0, 3).map((crop, index) => (
              <div
                key={crop.name}
                className={`p-4 rounded-lg border ${
                  index === 0
                    ? "border-green-500 bg-green-900/30"
                    : "border-green-900/50 bg-black/30"
                }`}
              >
                <h3 className="text-lg font-semibold text-green-400 mb-2">
                  {crop.name}
                </h3>
                <p className="text-green-300 text-sm mb-2">
                  {crop.description}
                </p>
                <div className="flex justify-between">
                  <span className="text-green-500 font-medium">
                    Suitability: {(crop.suitability * 100).toFixed(0)}%
                  </span>
                  {index === 0 && (
                    <span className="text-green-400 font-bold">Best Match</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Sensor Condition Summary */}
          <div className="mt-6 border-t border-green-900/50 pt-4">
            <h3 className="text-lg font-semibold text-green-400 mb-3">
              Current Growing Conditions
            </h3>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <Lightbulb className="mx-auto mb-2 text-green-500" />
                <p className="text-white">Light Intensity</p>
                <p className="text-white font-bold">
                  {latestData.light} lx
                </p>
              </div>
              <div>
                <Thermometer className="mx-auto mb-2 text-green-500" />
                <p className="text-white">Temperature</p>
                <p className="text-white font-bold">
                  {latestData.temperature}°C
                </p>
              </div>
              <div>
                <Wind className="mx-auto mb-2 text-green-500" />
                <p className="text-white">Gas Level</p>
                <p className="text-white font-bold">{latestData.gas} ppm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SensorCard = ({ icon, title, value, unit }) => (
  <div className="bg-gray-900 backdrop-blur-sm border border-green-900/50 rounded-xl p-6 shadow-lg shadow-green-900/20 hover:border-green-500 transition-colors duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-green-900/20 rounded-lg text-green-400">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-green-300">{title}</h3>
    </div>
    <div className="flex items-baseline gap-2">
      <span className="text-3xl font-bold text-white">{value}</span>
      <span className="text-sm text-white">{unit}</span>
    </div>
  </div>
);

const StatusCard = ({ icon, title, status }) => (
  <div className="bg-gray-900 backdrop-blur-sm border border-green-900/50 rounded-xl p-6 shadow-lg shadow-green-900/20 hover:border-green-500 transition-colors duration-300">
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-green-900/20 rounded-lg text-green-400">
        {icon}
      </div>
      <h3 className="text-sm font-medium text-green-300">{title}</h3>
    </div>
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          status ? "text-white animate-pulse" : "bg-gray-600"
        }`}
      />
      <span className="text-lg font-semibold text-white">
        {status ? "Active" : "Inactive"}
      </span>
    </div>
  </div>
);

export default App;