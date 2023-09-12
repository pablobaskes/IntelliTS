FROM node:18.10.0-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install nodemon

RUN npm install ts-node

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "dev" ]