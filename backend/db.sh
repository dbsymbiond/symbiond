#!/bin/sh
# backend/wait-for-db.sh

set -e

HOST="pg-user"
PORT="5432"
DATABASE_USER="$POSTGRES_USER"
DATABASE_NAME="$POSTGRES_DB"

echo "Waiting for PostgreSQL at $HOST:$PORT..."

# Loop until PostgreSQL is ready
until pg_isready -h "$HOST" -p "$PORT" -U "$DATABASE_USER" -d "$DATABASE_NAME"; do
  echo "PostgreSQL is unavailable - sleeping"
  sleep 1
done

echo "PostgreSQL is up and running!"

# Now, check if GeoJSON parsing is needed and run it
# You need a way to persistently mark that parsing has occurred.
# One simple way for development is a flag file within a mounted volume,
# or better, a simple check in the database itself.

# Option 1: Using a flag file (simple for dev, less robust for prod)
# This assumes you have a volume mounted for /app where the flag file can persist
PARSE_FLAG="/app/parsed_geojson.flag"
if [ ! -f "$PARSE_FLAG" ]; then
  echo "GeoJSON not yet parsed. Running parse-geojson..."
  # Use curl or a direct Node.js script execution
  # It's better to make the parsing logic a standalone script or module
  # that can be imported/called, rather than relying on an HTTP POST to itself.
  # For demonstration, let's assume you'll extract it.
  
  # For now, let's assume `node parseGeojsonScript.js` is how you run it
  # You'd need to extract the logic from your '/parse-geojson' route into a separate script.
  
  # TEMPORARY HACK: If you MUST call the HTTP endpoint from within the container.
  # This is usually not recommended as it creates a circular dependency on the web server.
  # It's far better to refactor the parsing logic into a callable function/script.
  # For this to work, your server.js needs to be running first, which creates a chicken-and-egg problem.
  # Let's focus on extracting the parsing logic.

  # --- REFACTORING SUGGESTION ---
  # Move the GeoJSON parsing logic from the `/parse-geojson` route
  # into a separate function or file, e.g., `backend/src/geojsonParser.js`.
  # Then call it directly from this startup script.

  # Example if you extract parsing to a module/script:
  # node /app/src/scripts/parseGeojson.js
  
  # For now, let's keep it conceptual:
  # You'd need your server.js to export a function or have a separate entry point.
  # Let's mock it for now, but seriously consider refactoring this.
  
  # A more robust approach for Docker:
  # Create a separate temporary service in docker-compose for the initial parsing,
  # or integrate it into your backend's startup.
  # Let's go with integrating it into the backend's startup via a script.
  
  # To call the existing HTTP route, you'd need the server.js to be up.
  # This makes things tricky. A better way: Make the parsing logic a *command* that
  # your backend container can run.

  # For the `parse-geojson` route, instead of calling it via HTTP (which requires the server to be up),
  # refactor the core parsing and database insertion logic into a separate, callable JavaScript function.
  # Example:
  # `node -r esm /app/server.js parse-geojson-command`
  # And then your server.js would check `process.argv` for `parse-geojson-command`
  # and execute the parsing logic if found, then exit.

  # Let's assume you've refactored the parsing into a function `parseAndInsertGeoJson()`
  # that you can call directly from a new script.
  echo "Running initial GeoJSON parsing..."
  node /app/scripts/initialParse.js # This new script would import and run the parsing logic
  
  touch "$PARSE_FLAG" # Mark as parsed
  echo "GeoJSON parsing complete and flagged."
else
  echo "GeoJSON already parsed (flag file found)."
fi

# Start the main application server
echo "Starting symbiond backend server..."
exec node server.js