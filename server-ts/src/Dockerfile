# Build Layer
FROM node:14-slim as build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci

COPY . .

RUN npm run build


# Package install Layer
FROM node:14-slim as node_modules

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm ci --only=production


# Run Layer
FROM gcr.io/distroless/nodejs:14

WORKDIR /app

ENV NODE_ENV=production

COPY --from=build /app/dist /app/dist
COPY --from=node_modules /app/node_modules /app/node_modules

CMD ["dist/main"]