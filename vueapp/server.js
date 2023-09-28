const express = require("express");
const http = require("http");
const socketIO = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: '*' } });

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    // Broadcast the message to all connected clients
    io.emit("message", message);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start the server on port 8081
const PORT = 8081;
server.listen(PORT, () => {
  console.log(`Socket.io server is running on port ${PORT}`);
});
