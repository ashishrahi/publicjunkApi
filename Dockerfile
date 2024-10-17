FROM node:20-alpine3.16
WORKDIR /user/app
COPY package.json dest
RUN npm install
COPY .env /user/app/
COPY swagger /user/app/
CMD [ "npm","run","devStart" ]