import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server as SocketIO } from "socket.io";
import dotenv from "dotenv";
import { SerialPort } from "serialport";
import { ReadlineParser } from "@serialport/parser-readline";
import twilio from "twilio";

dotenv.config();

// === Express + HTTP + Socket.io setup ===
const app = express();
const server = http.createServer(app);
const io = new SocketIO(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// === MongoDB Connection ===
mongoose
  .connect(
    process.env.MONGODB_URI ||
      "mongodb+srv://kolkata722122_db_user:Oa0Kb3tAe1YSdZCc@cluster0.lwolvk9.mongodb.net/?appName=Cluster0"
  )
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err.message));

// === Sensor Data Schema ===
const sensorDataSchema = new mongoose.Schema({
  temperature: Number,
  moisture: Number,
  pumpStatus: Boolean,
  flowRate: Number,
  timestamp: { type: Date, default: Date.now },
});

const SensorData = mongoose.model("SensorData", sensorDataSchema);

// === Twilio Setup ===
const client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// === Serial Port Setup ===
const portName = process.env.SERIAL_PORT || "COM3"; // Adjust for your system
let port;

try {
  port = new SerialPort({ path: portName, baudRate: 9600 });

  port.on("open", () => console.log(`✅ Serial port ${portName} opened`));
  port.on("error", (err) =>
    console.error("❌ Serial port error:", err.message)
  );

  // Read lines from Arduino serial output
  const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

  parser.on("data", async (line) => {
    // Ignore non-JSON lines like startup messages
    if (!line.trim().startsWith("{") || !line.trim().endsWith("}")) {
      console.log("⚙️ Ignored non-JSON line:", line);
      return;
    }

    try {
      console.log("🔄 Raw JSON data from Arduino:", line);
      const data = JSON.parse(line);

      // Map Arduino JSON keys to database fields
      const sensorData = {
        temperature: data.temperature,
        moisture: data.soil_moisture,
        pumpStatus: data.pump_state === "ON",
        flowRate: data.flow_rate || 0, // optional, default 0
        timestamp: new Date(),
      };

      console.log("📦 Parsed sensor data:", JSON.stringify(sensorData, null, 2));

      // Emit to frontend via socket.io
      io.emit("sensorData", sensorData);

      // Save to MongoDB
      await SensorData.create(sensorData);

      // Optional SMS alert via Twilio
      if (sensorData.pumpStatus && sensorData.flowRate === 0) {
        await client.messages.create({
          body: "⚠️ Warning: Pump is ON but no water is flowing!",
          from: process.env.TWILIO_PHONE_NUMBER,
          to: process.env.ALERT_PHONE_NUMBER,
        });
        console.log("📲 Alert SMS sent");
      }
    } catch (err) {
      console.error("❌ JSON parsing error:", err.message);
    }
  });
} catch (error) {
  console.error("❌ Serial port initialization error:", error.message);
}

// === Socket.io Connection ===
io.on("connection", (socket) => {
  console.log("📡 New client connected:", socket.id);
  socket.on("disconnect", () =>
    console.log("❌ Client disconnected:", socket.id)
  );
});

// === Routes ===
app.get("/", (req, res) => {
  res.send("🚀 Smart Irrigation Backend Running");
});

// Fetch latest 100 readings
app.get("/api/history", async (req, res) => {
  try {
    const data = await SensorData.find().sort({ timestamp: -1 }).limit(100);
    res.json(data);
  } catch (err) {
    console.error("❌ Error fetching history:", err.message);
    res.status(500).json({ error: "Failed to fetch history" });
  }
});

// === Start Server ===
const PORT = process.env.PORT || 8080;
server.listen(PORT, () =>
  console.log(`🌐 Server running on http://localhost:${PORT}`)
);
