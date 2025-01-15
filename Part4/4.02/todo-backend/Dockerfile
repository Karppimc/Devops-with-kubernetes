FROM node:alpine

WORKDIR /usr/src/app

COPY package.json ./
RUN npm install
RUN apk add --no-cache postgresql-client


COPY . .

EXPOSE 3005

CMD ["node", "server.js"]
