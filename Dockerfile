# Stage 1: build
FROM node:22-slim AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Собираем Nuxt
RUN npm run build

# Stage 2: production
FROM node:22-slim

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/.output ./

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
