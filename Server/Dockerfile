FROM node:9.4

WORKDIR /api

COPY package.json .

RUN npm install

COPY . .

EXPOSE 5000

CMD ["node", "index.js"]
