FROM node:14.15.4

RUN mkdir -p /usr/src/main
WORKDIR /usr/src/main

ENV NPM_CONFIG_LOGLEVEL warn
COPY ./package.json ./

RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "run", "$RUN_SCRIPT"]
