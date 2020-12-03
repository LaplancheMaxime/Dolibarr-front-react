FROM node:alpine

ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=development

WORKDIR /usr/src/app

COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../

COPY . ./

RUN ls -a
RUN chmod +x env.sh 

RUN apk add --no-cache bash

RUN /usr/src/app/env.sh && cp env-config.js ./public/
EXPOSE 3000
CMD ["npm", "start"]
