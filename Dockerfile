# Stage 1: Build
FROM node:22-slim AS builder

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем проект
COPY . .

# Устанавливаем переменную для production (по желанию)
ENV NODE_ENV=production

# Сборка проекта
RUN npm run build

# Stage 2: Production
FROM node:22-slim

WORKDIR /app

# Копируем только необходимые файлы из builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package*.json ./

# Устанавливаем только production зависимости
RUN npm ci --omit=dev

# Порт приложения
EXPOSE 3000

# Команда запуска
CMD ["node", ".output/server/index.mjs"]
