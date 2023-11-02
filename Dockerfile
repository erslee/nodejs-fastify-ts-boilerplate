# Build locally
# docker build -t project:1.0 -f ./Dockerfile .
# Run bash:
# docker run -it project:1.0 /bin/sh

# Run "production close" container
# docker run -p 8080:80 project:1.0 node index.js

# docker build -t us-central1-docker.pkg.dev/theta-inkwell-383512/quickstart-docker-repo/trader:1.0 -f Dockerfile .
# docker push us-central1-docker.pkg.dev/theta-inkwell-383512/quickstart-docker-repo/trader:1.0


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
