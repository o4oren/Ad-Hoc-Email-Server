FROM node:alpine

# Create app directory
WORKDIR /opt/ahem

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
ARG PROPERTIES_PATH

COPY package*.json ./
RUN npm install -g install @angular/cli
RUN npm install

COPY . .
RUN npm run build:ssr

EXPOSE 3000
EXPOSE 25
CMD [ "node", "ahem" ]
