# Build locally
# docker build -t project:1.0 -f ./Dockerfile .
# Run bash:
# docker run -it project:1.0 /bin/sh

# Run container
# docker run -p 8080:80 project:1.0 node dist/index.js


FROM node:20-alpine

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build
# RUN mv .env .env

ENV NODE_ENV=production \
  PORT=8080

EXPOSE 8080
CMD [ "node", "dist/index.cjs" ]
