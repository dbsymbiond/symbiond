// server.js
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { getTime, getDate } from './utils/time.js';
import { getGameCalendar } from './utils/calendar.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server);

let currentGameTime = getTime();
let currentGameDate = getDate();
let currentCalendar = getGameCalendar(
  currentGameDate.year,
  currentGameDate.month,
  currentGameDate.day
);

setInterval(() => {
  let newGameTime = getTime();
  let newGameDate = getDate();

  io.emit('timeUpdate', { time: newGameTime });

  if (newGameDate.day !== currentGameDate.day) {
    currentGameDate = newGameDate;
    currentCalendar = getGameCalendar(
      currentGameDate.year,
      currentGameDate.month,
      currentGameDate.day
    );

    io.emit('dateUpdate', { date: currentGameDate });
    io.emit('calendarUpdate', {
      calendar: currentCalendar,
      currentGameDate: currentGameDate,
    });
  }
}, 37);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.emit('timeUpdate', { time: currentGameTime });
  socket.emit('dateUpdate', { date: currentGameDate });
  socket.emit('calendarUpdate', {
    calendar: currentCalendar,
    currentGameDate: currentGameDate,
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));