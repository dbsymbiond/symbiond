FROM node:20-alpine

WORKDIR /app/backend

COPY backend /app/backend

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]