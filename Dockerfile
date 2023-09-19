FROM node

WORKDIR /app

COPY package*.json .

RUN ["npm", "i"]

COPY . .

EXPOSE 3001

RUN chown node:node /app

USER node