FROM node:20-alpine

# Создание директории приложения
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей
RUN npm ci

# Копирование исходного кода
COPY . .

# Сборка приложения
RUN npm run build

# Экспозиция порта
EXPOSE 5000

# Команда запуска
CMD ["npm", "run", "start"]