FROM node:20

WORKDIR /app

COPY package*.json ./

RUN nuxt i

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start", "--", "--host", "0.0.0.0", "--port", "3001"]