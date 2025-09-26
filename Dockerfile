# Этап сборки
FROM node:22-alpine AS builder

WORKDIR /app

# Копируем package.json + package-lock.json и ставим зависимости
COPY package*.json ./
RUN npm install

# Копируем код
COPY . .

# Собираем проект с флагом --standalone
RUN npm run build -- --standalone

# Этап запуска, легкий образ без исходников и node_modules
FROM node:22-alpine AS production

WORKDIR /app

# Устанавливаем только nuxt-start — легкий рантайм
RUN npm install nuxt-start

# Копируем собранный билд из стадии сборки
COPY --from=builder /app/.output /app/.output

# Открываем порт
EXPOSE 3000

# Запускаем через nuxt-start
CMD ["npx", "nuxt-start", "--host", "0.0.0.0", "--port", "3000"]