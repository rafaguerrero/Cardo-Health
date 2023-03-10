FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install
RUN npm install concurrently
RUN npm install serve

COPY cardo-health-api/package*.json ./cardo-health-api/
WORKDIR /usr/src/app/cardo-health-api
RUN npm install
COPY cardo-health-api/. .

WORKDIR /usr/src/app

COPY cardo-health-app/package*.json ./cardo-health-app/
WORKDIR /usr/src/app/cardo-health-app
RUN npm install
COPY cardo-health-app/. .
CMD [ "npm", "run", "build" ]

WORKDIR /usr/src/app

EXPOSE 3000
EXPOSE 3001
CMD [ "npm", "start" ]