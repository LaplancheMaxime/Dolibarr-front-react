# build environment
FROM node:alpine as build
WORKDIR /app


ENV PATH /app/node_modules/.bin:$PATH
ENV NODE_ENV=production
ENV NODE_OPTIONS=--openssl-legacy-provider 

COPY package.json ./
COPY package-lock.json ./
RUN npm i
COPY . ./
RUN npm run build

# production environment
FROM nginx:stable-alpine

# Add bash
RUN apk add --no-cache bash

COPY --from=build /app/build /usr/share/nginx/html
WORKDIR /usr/share/nginx/html
EXPOSE 80

# Copy .env file and shell script to container
COPY /env.sh .
COPY /.env .

# Make our shell script executable
RUN chmod +x env.sh

CMD ["/bin/bash", "-c", "/usr/share/nginx/html/env.sh && nginx -g \"daemon off;\""]
