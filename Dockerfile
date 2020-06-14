FROM node:13

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build:ssr

EXPOSE 3000
EXPOSE 25
CMD [ "node", "ahem" ]
