FROM node:18.10.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install
RUN npm install nodemon
RUN npm install ts-node

RUN apk add --no-cache bash

COPY wait-for-it.sh /usr/wait-for-it.sh

RUN chmod +x /usr/wait-for-it.sh

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]
