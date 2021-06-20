FROM nginx:1.19.6-alpine as base
LABEL name="x89/market-place"

FROM node:14.17.1-alpine as build
WORKDIR /app
RUN apk add yarn


COPY ./package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM base
COPY --from=build /app/build /usr/share/nginx/html
COPY ./docker/site.conf /etc/nginx/conf.d/default.conf