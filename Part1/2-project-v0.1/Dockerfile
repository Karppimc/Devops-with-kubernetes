FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
COPY server.js ./
RUN npm install
CMD ["node", "server.js"]
