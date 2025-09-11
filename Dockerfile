# Stage 1: build
FROM node:20-slim AS builder

# Рабочая директория
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm ci

# Копируем весь проект
COPY . .

# Указываем транспиляцию для @headlessui/vue
# В nuxt.config.ts нужно добавить:
# vite: { ssr: { noExternal: ['@headlessui/vue'] } }

# Собираем проект
RUN npm run build

# Stage 2: production
FROM node:20-slim AS production

WORKDIR /app

# Копируем только необходимые файлы
COPY package*.json ./
RUN npm ci --omit=dev

# Копируем сборку из Stage 1
COPY --from=builder /app/.output ./

# Экспорт порта
EXPOSE 3000

# Запуск приложения
CMD ["node", ".output/server/index.mjs"]
