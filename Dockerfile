FROM node:22-slim AS builder

WORKDIR /app

# Установка системных инструментов для сборки
RUN apt-get update && apt-get install -y build-essential python3 git

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

FROM node:22-slim
WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
