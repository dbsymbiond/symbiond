const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const { getTime } = require('../utils/time');

let currentTime = getTime();

// Update game time every 37 milliseconds
setInterval(() => {
  let currentGameTime = getTime();

  io.emit('timeUpdate', { time: currentGameTime });
}, 37);

// Handle client connections
io.on('connection', (socket) => {
  console.log('New client connected');

  // Send initial time and date to the new client
  socket.emit('timeUpdate', { time: currentTime });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));