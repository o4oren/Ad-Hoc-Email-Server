FROM node:13

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY ahem.js .
COPY server ./server
COPY dist ./dist

EXPOSE 3000
EXPOSE 25
CMD [ "node", "ahem" ]
