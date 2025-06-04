FROM node:20-alpine

# Install PostgreSQL client tools
# These tools include pg_isready, psql, etc., which are necessary for your db.sh script.
RUN apk add --no-cache postgresql-client

WORKDIR /app

COPY /backend/package*.json ./

RUN npm install

# Copy the db.sh script and make it executable
COPY backend/db.sh /usr/local/bin/db.sh
RUN chmod +x /usr/local/bin/db.sh

# This line copies your entire backend folder into /app/backend/
# You might want to adjust this if your scripts/assets aren't directly under backend/
# For example, if you want everything directly in /app: COPY /backend /app/
# But given your current structure, this might be intentional.
COPY /backend /app/backend/

EXPOSE 3000

# Set the entrypoint to your wait script
ENTRYPOINT ["/usr/local/bin/db.sh"]

CMD []