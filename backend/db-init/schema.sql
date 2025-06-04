-- backend/db-init/schema.sql

-- !!! CRITICAL: Enable the PostGIS extension FIRST for the current database !!!
-- This must be at the very top, before any tables using GEOMETRY types are created.
CREATE EXTENSION IF NOT EXISTS postgis;

-- Create the base_map_cells table if it doesn't exist
CREATE TABLE IF NOT EXISTS base_map_cells (
    id VARCHAR(255) PRIMARY KEY, -- Assuming 'id' from GeoJSON is a string unique identifier
    geometry GEOMETRY(Polygon, 4326), -- Use GEOMETRY type for PostGIS, 4326 is SRID for WGS84
    height INTEGER,
    biome INTEGER,
    cell_type VARCHAR(255), -- Renamed from 'type' to 'cell_type' to avoid SQL keyword conflict
    population INTEGER,
    state INTEGER,
    province VARCHAR(255),
    culture VARCHAR(255),
    religion VARCHAR(255),
    neighbors INTEGER[],
    properties JSONB -- Store otherProperties as JSONB
);

-- Add a spatial index for better performance on spatial queries (like ST_Intersects)
CREATE INDEX IF NOT EXISTS idx_base_map_cells_geometry ON base_map_cells USING GIST (geometry);

-- Optional: Create a user for your application and grant privileges
-- (Only include if you need a specific app user; otherwise, the POSTGRES_USER will be the superuser)
-- Example:
-- DO
-- $do$
-- BEGIN
--    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'symbiond_app') THEN
--       CREATE USER symbiond_app WITH PASSWORD 'your_secure_app_password_for_app_user';
--    END IF;
-- END
-- $do$;
-- GRANT CONNECT ON DATABASE symbiond_db TO symbiond_app;
-- GRANT SELECT, INSERT, UPDATE, DELETE ON base_map_cells TO symbiond_app;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO symbiond_app;
-- ALTER DEFAULT PRIVILEGES FOR ROLE symbiond_app IN SCHEMA public GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO symbiond_app;