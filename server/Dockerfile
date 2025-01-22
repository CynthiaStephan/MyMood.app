FROM node:lts

# Définir le répertoire de travail
WORKDIR /usr/app

COPY package.json .
COPY src/index.js .

RUN npm install

# Exposer le port 3650
EXPOSE ${SERVER_PORT}