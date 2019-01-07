FROM node:10.15.0-alpine

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 25
CMD [ "node", "ahem" ]
