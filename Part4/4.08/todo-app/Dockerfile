FROM node:alpine
WORKDIR /usr/src/app
COPY package.json ./
RUN npm install
COPY . .
RUN mkdir -p /usr/src/app/images
RUN chown -R node:node /usr/src/app/images
EXPOSE 3006
CMD ["npm", "start"]
