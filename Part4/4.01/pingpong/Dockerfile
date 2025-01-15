FROM node:alpine

# Install PostgreSQL client
RUN apk add --no-cache postgresql-client

RUN echo $PATH && which pg_isready && pg_isready --version


WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose the application port
EXPOSE 3002

# Start the application
CMD ["npm", "start"]
