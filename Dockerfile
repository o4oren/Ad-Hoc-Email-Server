FROM node:10.15.0-alpine

WORKDIR /opt/ahem

ARG PROPERTIES_PATH

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000
EXPOSE 25
CMD [ "node", "ahem" ]
