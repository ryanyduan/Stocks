FROM node:9.4

WORKDIR /usr/src/client

COPY ./package*.json ./

RUN npm install

COPY ./ .

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]