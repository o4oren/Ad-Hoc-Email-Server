FROM node:13

WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build:ssr

# override in your docker-compose, kubrnetes, swarm configuration - or uncomment
#EXPOSE 3000
#EXPOSE 25
CMD [ "node", "ahem" ]
