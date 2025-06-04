// backend/scripts/initialParse.js

import fs from "fs";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";

const { Pool } = pg;

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the path to the flag file
const flagFilePath = path.join(__dirname, "..", "parsed_geojson.flag");

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "pg-user", // This should match the service name in your docker-compose.yml
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
});

async function parseAndInsertGeoJson() {
  // Check if the flag file exists
  if (process.env.NODE_ENV !== "development" && fs.existsSync(flagFilePath)) {
    console.log("GEOJSON already parsed (flag file found). Skipping parsing");
    return;
  }

  console.log("Running initial GeoJSON parsing...");
  const filePath = path.join(__dirname, "..", "assets", "symbiond.geojson");

  console.log(`Attempting to read GeoJSON from: ${filePath}`);

  try {
    const data = await fs.promises.readFile(filePath, "utf8");
    const geojsonData = JSON.parse(data);
    console.log("GeoJSON data has been successfully parsed!");

    let insertionCount = 0;
    const client = await pool.connect();

    try {
      await client.query("BEGIN"); // Start transaction

      if (geojsonData.features && Array.isArray(geojsonData.features)) {
        for (const feature of geojsonData.features) {
          if (
            feature.geometry &&
            feature.geometry.coordinates &&
            feature.properties
          ) {
            const {
              id,
              height,
              biome,
              type, // 'type' is fine here as a JS variable, will be mapped to cell_type in DB
              population,
              state,
              province,
              culture,
              religion,
              neighbors,
            } = feature.properties;

            // Construct GeoJSON fragment for ST_GeomFromGeoJSON
            const geometryGeoJSON = JSON.stringify({
              type: feature.geometry.type,
              coordinates: feature.geometry.coordinates,
            });

            const query = `
              INSERT INTO base_map_cells (id, geometry, height, biome, cell_type, population, state, province, culture, religion, neighbors)
              VALUES ($1, ST_GeomFromGeoJSON($2), $3, $4, $5, $6, $7, $8, $9, $10, $11)
              ON CONFLICT (id) DO NOTHING; -- Prevents errors if script is run multiple times and data exists
            `;
            const values = [
              id,
              geometryGeoJSON, // Pass the stringified GeoJSON geometry
              height,
              biome,
              type, // Use 'type' from GeoJSON, which maps to 'cell_type' in DB
              population,
              state,
              province,
              culture,
              religion,
              neighbors, // Use the stringified version for the JSONB column
            ];

            await client.query(query, values);
            insertionCount++;
          }
        }
      }
      await client.query("COMMIT"); // Commit transaction
      console.log(
        `GeoJSON parsed and data inserted successfully. Inserted features: ${insertionCount}`
      );

      if (process.env.NODE_ENV !== "development") {
        await fs.promises.writeFile(flagFilePath, "parsed");
        console.log("GeoJSON parsing flag file created");
      }
    } catch (dbError) {
      await client.query("ROLLBACK"); // Rollback transaction on error
      console.error("Error inserting data into PostgreSQL:", dbError);
      process.exit(1); // Exit with error code if DB insertion fails
    } finally {
      client.release();
    }
  } catch (parseError) {
    console.error("Failed to read or parse the GeoJSON data:", parseError);
    process.exit(1); // Exit with error code if GeoJSON parsing/reading fails
  } finally {
    pool.end(); // Close the pool after the script is done
  }
}

// Execute the parsing function
parseAndInsertGeoJson();
