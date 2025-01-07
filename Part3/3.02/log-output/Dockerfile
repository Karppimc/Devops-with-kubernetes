# Use Node.js Alpine image for a lightweight environment
FROM node:alpine

# Set the working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package.json ./
RUN npm install

# Copy the application source code
COPY . .

# Expose the application port
EXPOSE 3001

# Start the application
CMD ["node", "server.js"]

