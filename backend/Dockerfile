FROM node:20-alpine

# Install PostgreSQL client tools and dos2unix utility
# dos2unix is used to convert Windows line endings to Unix line endings
RUN apk add --no-cache postgresql-client dos2unix

WORKDIR /app

# Copy package*.json and install dependencies FIRST to leverage Docker cache
COPY backend/package*.json ./
RUN npm install

# Copy the db.sh script to its destination
COPY backend/db.sh /usr/local/bin/db.sh
# Convert line endings and then make it executable
RUN dos2unix /usr/local/bin/db.sh && chmod +x /usr/local/bin/db.sh

# Copy the rest of your backend application code
# Ensure this copies all necessary files for your server.js, scripts, assets, etc.
COPY backend /app/backend/

EXPOSE 3000

# Set the entrypoint to your wait script
ENTRYPOINT ["/usr/local/bin/db.sh"]

CMD []