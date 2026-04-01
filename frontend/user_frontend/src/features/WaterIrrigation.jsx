import React, { useEffect, useState, useRef, useCallback } from "react";
import io from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
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
import {
  Droplets,
  Thermometer,
  Timer,
  Power,
  Gauge,
  AlertTriangle,
  Zap,
  Clock,
} from "lucide-react";

const getIrrigationRecommendation = (moisture, temperature) => {
  const conditions = [
    {
      status: "Critical - Immediate Watering Required",
      priority: "High",
      action: "Start irrigation immediately",
      threshold: 20,
      color: "text-red-500",
      pumpAction: "START",
    },
    {
      status: "Low Moisture - Schedule Watering",
      priority: "Medium",
      action: "Schedule watering within next 6 hours",
      threshold: 40,
      color: "text-yellow-500",
      pumpAction: "START",
    },
    {
      status: "Adequate Moisture",
      priority: "Low",
      action: "Consider stopping irrigation",
      threshold: 60,
      color: "text-green-500",
      pumpAction: "STOP",
    },
    {
      status: "Optimal Moisture Level",
      priority: "None",
      action: "Stop irrigation immediately",
      threshold: 80,
      color: "text-green-400",
      pumpAction: "STOP",
    },
    {
      status: "Over-Watered",
      priority: "High",
      action: "Stop irrigation immediately! Risk of waterlogging",
      threshold: 100,
      color: "text-red-500",
      pumpAction: "STOP",
    },
  ];

  const currentCondition =
    conditions.find((condition) => moisture <= condition.threshold) ||
    conditions[conditions.length - 1];

  let temperatureAdvice = "";
  if (temperature > 30) {
    temperatureAdvice =
      "High temperature detected - consider increasing watering frequency";
  } else if (temperature < 10) {
    temperatureAdvice =
      "Low temperature detected - consider reducing watering frequency";
  }

  return {
    ...currentCondition,
    temperatureAdvice,
  };
};

const WaterIrrigation = () => {
  const [sensorData, setSensorData] = useState([]);
  const [latestData, setLatestData] = useState({
    moisture: 0,
    temperature: 0,
    flow_rate: 0,
    pump_status: false,
  });
  const [recommendation, setRecommendation] = useState(null);
  const [showPumpWarning, setShowPumpWarning] = useState(false);
  const [pumpOnDuration, setPumpOnDuration] = useState(0); // in seconds
  const pumpStartTimeRef = useRef(null);

  const socket = useRef(null);

  const handleSensorData = useCallback((data) => {
    const formattedData = {
      moisture: data.moisture,
      temperature: data.temperature,
      flow_rate: data.flowRate,
      pump_status: data.pumpStatus,
      time: new Date().toLocaleTimeString(),
    };

    setLatestData(formattedData);

    setSensorData((prev) => {
      const newData = [...prev, formattedData];
      return newData.slice(-20);
    });

    const newRecommendation = getIrrigationRecommendation(
      formattedData.moisture,
      formattedData.temperature
    );
    setRecommendation(newRecommendation);

    setShowPumpWarning(
      formattedData.pump_status && newRecommendation.pumpAction === "STOP"
    );

    // Track pump ON duration
    if (formattedData.pump_status && !pumpStartTimeRef.current) {
      pumpStartTimeRef.current = Date.now();
    }

    if (!formattedData.pump_status && pumpStartTimeRef.current) {
      const elapsed = Math.floor(
        (Date.now() - pumpStartTimeRef.current) / 1000
      );
      setPumpOnDuration((prev) => prev + elapsed);
      pumpStartTimeRef.current = null;
    }
  }, []);

  const togglePump = () => {
    if (socket.current) {
      const newStatus = !latestData.pump_status;
      socket.current.emit("togglePump", { status: newStatus });
      toast.success(`Pump ${newStatus ? "Started" : "Stopped"} manually`);
    }
  };

  useEffect(() => {
    socket.current = io("http://localhost:8080");

    socket.current.on("sensorData", handleSensorData);

    socket.current.on("alert", (msg) => {
      toast.error(`ALERT: ${msg}`);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [handleSensorData]);

  useEffect(() => {
    fetch("http://localhost:8080/api/history")
      .then((res) => res.json())
      .then((data) => {
        const formatted = data.map((item) => ({
          ...item,
          time: new Date(item.timestamp).toLocaleTimeString(),
        }));
        setSensorData(formatted.slice(-20));
      });
  }, []);

  const formatDuration = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  return (
    <div className="min-h-screen bg-black text-white pt-10">
      <Toaster position="top-right" />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-10 border-b pb-4">
          <div className="flex items-center gap-3">
            <Droplets className="w-8 h-8 text-green-400" />
            <h1 className="text-3xl font-bold text-green-400">
              Smart Irrigation Monitor
            </h1>
          </div>
          <div className="text-right">
            <p className="text-green-300">Live Monitoring System</p>
            <p className="text-sm text-green-500">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {showPumpWarning && (
          <div className="mb-6 bg-red-900/30 border border-red-500 rounded-lg p-4 flex items-center gap-3 animate-pulse">
            <AlertTriangle className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-red-500 font-semibold">Pump Warning</h3>
              <p className="text-red-400">
                Moisture levels are sufficient. Consider turning off the pump.
              </p>
            </div>
          </div>
        )}

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            icon={<Gauge className="w-6 h-6" />}
            title="Soil Moisture"
            value={latestData.moisture}
            unit="%"
          />
          <SensorCard
            icon={<Thermometer className="w-6 h-6" />}
            title="Temperature"
            value={latestData.temperature}
            unit="°C"
          />
          <SensorCard
            icon={<Timer className="w-6 h-6" />}
            title="Flow Rate"
            value={latestData.flow_rate}
            unit="L/min"
          />
          <StatusCard
            icon={<Power className="w-6 h-6" />}
            title="Pump Status"
            status={latestData.pump_status}
          />
        </div>

        {/* Pump ON duration */}
        <div className="mb-6 flex items-center gap-3 text-green-400">
          <Clock className="w-5 h-5" />
          <p>Pump ON Time: {formatDuration(pumpOnDuration)}</p>
        </div>

        {/* Pump Control */}
        <div className="flex justify-end mb-10">
          <button
            onClick={togglePump}
            className="flex items-center gap-2 px-4 py-2 bg-green-700 hover:bg-green-600 text-white rounded"
          >
            <Zap className="w-4 h-4" />
            {latestData.pump_status ? "Stop Pump" : "Start Pump"}
          </button>
        </div>

        {/* Graph */}
        <div className="bg-gray-900 p-6 rounded-xl mb-10">
          <h2 className="text-xl font-semibold mb-4 text-green-400">
            Sensor Data Trends
          </h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sensorData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2d2d2d" />
              <XAxis dataKey="time" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="moisture" stroke="#22c55e" />
              <Line type="monotone" dataKey="temperature" stroke="#ef4444" />
              <Line type="monotone" dataKey="flow_rate" stroke="#3b82f6" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recommendation */}
        {recommendation && (
          <div className="bg-gray-900 p-6 rounded-xl">
            <h2 className="text-xl font-semibold text-green-400 mb-4">
              Irrigation Recommendation
            </h2>
            <div className="text-white">
              <p className={`font-semibold ${recommendation.color}`}>
                {recommendation.status}
              </p>
              <p>Priority: {recommendation.priority}</p>
              <p>Action: {recommendation.action}</p>
              {recommendation.temperatureAdvice && (
                <p className="text-yellow-400 mt-2">
                  {recommendation.temperatureAdvice}
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const SensorCard = ({ icon, title, value, unit }) => (
  <div className="bg-gray-800 p-4 rounded-xl border border-green-800">
    <div className="flex items-center gap-3 mb-2 text-green-300">
      {icon} {title}
    </div>
    <div className="text-2xl font-bold">
      {value} {unit}
    </div>
  </div>
);

const StatusCard = ({ icon, title, status }) => (
  <div className="bg-gray-800 p-4 rounded-xl border border-green-800">
    <div className="flex items-center gap-3 mb-2 text-green-300">
      {icon} {title}
    </div>
    <div className="flex items-center gap-2">
      <div
        className={`w-3 h-3 rounded-full ${
          status ? "bg-green-500 animate-pulse" : "bg-gray-600"
        }`}
      />
      <span className="text-lg font-semibold">
        {status ? "Running" : "Stopped"}
      </span>
    </div>
  </div>
);

export default WaterIrrigation;