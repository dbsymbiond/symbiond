import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import pg from 'pg';
const { Pool } = pg;
import { Server } from 'socket.io';
import { getTime, getDate } from './utils/time.js';
import { getGameCalendar } from './utils/calendar.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: 'host.docker.internal',
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

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

io.on('connection', async (socket) => {
  console.log('New client connected');
  // test the db client connection
  const client = await pool.connect();
  const result = await client.query('SELECT NOW()');
  console.log('current connection time: ', result.rows[0].now);

  socket.emit('timeUpdate', { time: currentGameTime });
  socket.emit('dateUpdate', { date: currentGameDate });
  socket.emit('calendarUpdate', {
    calendar: currentCalendar,
    currentGameDate: currentGameDate,
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
    client.release();
  });
});

// map
// Serve biome and political tiles
app.use('/tiles/biome_tiles', express.static(path.join(__dirname, 'assets/biome_tiles')));
app.use('/tiles/political_tiles', express.static(path.join(__dirname, 'assets/political_tiles')));

app.get('/map', (req, res) => {
  const height = req.query.height || '100vh'; // Use provided height or fallback
  const layer = req.query.layer || 'biome'; // Default to 'biome' if no layer is specified

  // Determine tile directory based on the layer
  const tilePath = layer === 'political' ? '/tiles/political_tiles' : '/tiles/biome_tiles';

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Symbiond Map</title>
      <style>
        html, body {
          margin: 0;
          padding: 0;
          width: 100vw;
          height: ${height}px;
          overflow: hidden;
        }
        .scroll-container {
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }
        .map-container {
          display: grid;
          grid-template-columns: repeat(16, 1fr);
          width: 100%;
          height: auto;
          aspect-ratio: 6144 / 11984;
        }
        .map-tile {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      </style>
    </head>
    <body>
      <div class="scroll-container">
        <div class="map-container">
          ${Array.from({ length: 16 }, (_, row) =>
    Array.from({ length: 16 }, (_, col) => {
      const letter = String.fromCharCode(65 + row);
      const tileId = `${letter}${col + 1}`;
      return `<img class="map-tile" src="${tilePath}/${tileId}.png" alt="${tileId}" />`;
    }).join('')).join('')}
        </div>
      </div>
      <script>
        window.onload = function() {
          const scrollContainer = document.querySelector('.scroll-container');
          const mapContainer = document.querySelector('.map-container');

          // Scroll to the midpoint of the map
          scrollContainer.scrollLeft = (mapContainer.offsetWidth - scrollContainer.offsetWidth) / 2;
          scrollContainer.scrollTop = ((mapContainer.offsetHeight - scrollContainer.offsetHeight) / 2) + 60;
        };
      </script>
    </body>
    </html>
  `);
});









const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));