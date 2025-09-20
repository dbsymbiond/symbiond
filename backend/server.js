import cors from "cors";
import express from "express";
import http from "http";
import path from "path";
import { fileURLToPath } from "url";
import pg from "pg";
const { Pool } = pg;
import { Server } from "socket.io";
import vtPbf from "vt-pbf";
import geojsonvt from "geojson-vt";
import { promisify } from "util";
import zlib from "zlib";

const gzip = promisify(zlib.gzip);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "pg-user",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

io.on("connection", async (socket) => {
  console.log("New client connected to symbiond database");
  // test the db client connection
  const client = await pool.connect();
  const result = await client.query("SELECT NOW()");
  console.log("current connection time: ", result.rows[0].now);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
    client.release();
  });
});

app.get("/api/tiles/:z/:x/:y.pbf", async (req, res) => {
  const { z, x, y } = req.params;
  const zoom = parseInt(z, 10);
  const tileX = parseInt(x, 10);
  const tileY = parseInt(y, 10);

  // Calculate the bounding box for the tile (in WGS 84 - EPSG:4326)
  const tileSize = 512;
  const worldSize = tileSize * Math.pow(2, zoom);

  const pixelXMin = tileX * tileSize;
  const pixelXMax = (tileX + 1) * tileSize;
  const pixelYMin = tileY * tileSize;
  const pixelYMax = (tileY + 1) * tileSize;

  const normalizedXMin = pixelXMin / worldSize;
  const normalizedXMax = pixelXMax / worldSize;
  const normalizedYMin = pixelYMin / worldSize;
  const normalizedYMax = pixelYMax / worldSize;

  const minLongitude = normalizedXMin * 360 - 180;
  const maxLongitude = normalizedXMax * 360 - 180;
  const maxLatitude =
    (180 / Math.PI) * Math.atan(Math.sinh(Math.PI * (1 - normalizedYMin * 2)));
  const minLatitude =
    (180 / Math.PI) * Math.atan(Math.sinh(Math.PI * (1 - normalizedYMax * 2)));

  try {
    const client = await pool.connect();
    const query = `
      SELECT
        id,
        ST_AsGeoJSON(geometry) AS geometry,
        height,
        biome,
        population,
        state,
        province,
        culture,
        religion,
        neighbors
      FROM base_map_cells
      WHERE ST_Intersects(geometry, ST_MakeEnvelope($1, $2, $3, $4, 4326))
    `;
    const values = [minLongitude, minLatitude, maxLongitude, maxLatitude];
    const result = await client.query(query, values);
    client.release();

    const features = result.rows
      .filter((row) => row !== undefined)
      .map((row) => {
        let geometry;
        try {
          geometry = JSON.parse(row.geometry);
        } catch (error) {
          return null;
        }

        return {
          type: "Feature",
          geometry: geometry,
          properties: { ...row },
        };
      })
      .filter(
        (feature) =>
          feature !== null &&
          feature.geometry &&
          feature.geometry.coordinates &&
          Array.isArray(feature.geometry.coordinates)
      );

    const geojson = {
      type: "FeatureCollection",
      features: features,
    };

    const tileIndex = geojsonvt(geojson, {
      maxZoom: 12,
      tolerance: 3,
      extent: 4096,
      buffer: 64,
      debug: 0,
    });

    const tile = tileIndex.getTile(zoom, tileX, tileY);

    let buffer;
    if (tile) {
      buffer = vtPbf.fromGeojsonVt({
        base_map_cells: tile,
      });
    } else {
      buffer = vtPbf.fromGeojsonVt({
        base_map_cells: { features: [] },
      });
    }
    try {
      const gzippedBuffer = await gzip(buffer);
      res.setHeader("Content-Type", "application/x-protobuf");
      res.setHeader("Content-Encoding", "gzip");
      res.send(gzippedBuffer);
    } catch (err) {
      console.error("Error gzipping buffer:", err);
      res.status(500).send("Error gzipping tile data");
    }
  } catch (dbError) {
    console.error("Error querying PostgreSQL:", dbError);
    res
      .status(500)
      .json({ error: "Failed to query PostgreSQL", details: dbError.message });
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
