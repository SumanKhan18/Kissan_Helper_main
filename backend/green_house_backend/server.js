import express from "express";
import http from "http";
import { Server } from "socket.io";
import { SerialPort, ReadlineParser } from "serialport";
import mongoose from "mongoose";
import twilio from "twilio";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// ✅ Allow CORS for React frontend
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const server = http.createServer(app);

// ✅ Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});

// ✅ WebSocket Debug Logs
server.on("upgrade", (req, socket, head) => {
  console.log("🔄 WebSocket upgrade request from:", req.headers.origin || "unknown");
});

// ✅ Track Socket Connections
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);
  socket.on("disconnect", (reason) => {
    console.warn("🔴 Client disconnected:", socket.id, "| Reason:", reason);
  });
  socket.on("connect_error", (err) => {
    console.error("⚠️ Socket connect error:", err.message);
  });
});

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// ✅ Schema & Model
const sensorSchema = new mongoose.Schema({
  light: Number,
  temperature: Number,
  gas: Number,
  artificial_light: Boolean,
  white_led: Boolean,
  timestamp: { type: Date, default: Date.now },
});
const SensorData = mongoose.model("SensorData", sensorSchema);

// ✅ Serial Communication
const port = new SerialPort({ path: "COM4", baudRate: 9600 });
const parser = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// ✅ Twilio Setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;
const farmerPhone = process.env.FARMER_PHONE;
const client = twilio(accountSid, authToken);

// ✅ SMS Alert Function
const sendAlert = async (type, value) => {
  const message = `🚨 ALERT! Greenhouse Issue\n⚠ ${type}: ${value}\nTake action immediately!`;

  try {
    const msg = await client.messages.create({
      body: message,
      from: twilioPhone,
      to: farmerPhone,
    });
    console.log(`✅ SMS Sent! SID: ${msg.sid} Status: ${msg.status}`);
  } catch (error) {
    console.error("❌ SMS Error:", error.message);
  }
};

// ✅ Handle Incoming Serial Data
parser.on("data", async (data) => {
  console.log("📝 Raw Serial Data:", data);

  try {
    const safeData = data
      .trim()
      .replace(/\bnan\b/gi, "null")
      .replace(/\bNaN\b/g, "null")
      .replace(/\bInfinity\b/g, "null")
      .replace(/\b-Infinity\b/g, "null");

    const jsonData = JSON.parse(safeData);

    const light = Number(jsonData.light) || 0;
    const temperature = Number(jsonData.temperature) || 0;
    const gas = Number(jsonData.gas) || 0;
    const artificial_light = Boolean(jsonData.artificial_light);
    const white_led = Boolean(jsonData.white_led);

    const cleanData = { light, temperature, gas, artificial_light, white_led };
    console.log("📡 Clean Sensor Data:", cleanData);

    // ✅ Save Data to MongoDB
    const sensorEntry = new SensorData(cleanData);
    await sensorEntry.save();
    console.log("✅ Data Saved to MongoDB");

    // ✅ Emit to Frontend
    io.emit("sensorData", cleanData);

    // ✅ Alerts
    if (light < 450) sendAlert("Low Light Intensity", light);
    if (temperature > 35) sendAlert("High Temperature", temperature);
    if (gas > 400) sendAlert("High Gas Level", gas);

  } catch (error) {
    console.error("❌ Error Parsing JSON:", error.message, "| Raw Data:", data);
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
