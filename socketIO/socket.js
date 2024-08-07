const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.json());

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Send a welcome message to the connected client
  socket.emit('notification', 'Welcome! You are now connected.');

  // Listen for a custom event from the client
  socket.on('sendNotification', (message) => {
    // Broadcast the notification to all connected clients
    io.emit('notification', message);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 5400;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
