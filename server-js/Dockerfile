# Package install Layer
FROM node:14-slim as node_modules

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

ENV NODE_ENV=development

COPY ./src /app/src

CMD ["npm", "run", "start-stg"]