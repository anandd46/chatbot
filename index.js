require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { PrismaClient } = require("@prisma/client");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins for dev
    methods: ["GET", "POST"]
  }
});

const prisma = new PrismaClient();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic Route
app.get("/", (req, res) => {
  res.send({ status: "API is running", message: "Welcome to Nexus AI Backend" });
});

// Socket.io for Real-time chat
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  socket.on("send_message", async (data) => {
    // data: { chatId, userId, content }
    console.log("Message received:", data);
    
    // Here we would typically:
    // 1. Save user message to DB
    // 2. Call LangChain / OpenAI logic
    // 3. Emit response back to user
    
    // Mock response for now
    setTimeout(() => {
      socket.emit("receive_message", {
        sender: "ai",
        content: `I received your message: "${data.content}". The RAG logic is yet to be fully implemented.`,
        createdAt: new Date()
      });
    }, 1500);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
