# Frontend Developer Portfolio

Профессиональный веб-сайт-портфолио для frontend разработчика, демонстрирующий GitHub репозитории и навыки.

## Функциональные возможности

- Современный дизайн с адаптивной версткой
- Анимированный Hero-блок с эффектом печатания кода
- Секции: About, Skills, Projects, Experience, Contact
- Интеграция с GitHub API для автоматического отображения репозиториев
- Форма обратной связи

## Технологии

- **Frontend**: React, TypeScript, Tailwind CSS, ShadCN UI
- **Backend**: Node.js, Express
- **State Management**: TanStack React Query
- **Формы**: React Hook Form с Zod валидацией
- **Анимации**: Пользовательские хуки для эффектов

## Запуск проекта

### Локальная разработка

1. Клонируйте репозиторий
2. Установите зависимости:
   ```bash
   npm install
   ```
3. Создайте файл `.env` на основе `.env.example`
4. Запустите проект в режиме разработки:
   ```bash
   npm run dev
   ```

### Docker

Проект включает Docker-конфигурацию для простого запуска в контейнере:

1. Убедитесь, что Docker и Docker Compose установлены
2. Создайте файл `.env` на основе `.env.example`
3. Соберите и запустите контейнеры:
   ```bash
   docker-compose up -d
   ```
4. Приложение будет доступно на http://localhost:5000

## Структура проекта

```
├── client               # Frontend (React, TypeScript)
│   ├── src
│   │   ├── components   # UI компоненты
│   │   ├── hooks        # Кастомные React хуки
│   │   ├── lib          # Утилиты и клиентские настройки
│   │   └── pages        # Страницы приложения
├── server               # Backend (Express)
│   ├── routes.ts        # API эндпоинты
│   └── storage.ts       # Хранилище данных (in-memory)
├── shared               # Общие типы и схемы
│   └── schema.ts        # Схемы данных с Zod
├── docker-compose.yml   # Docker Compose конфигурация
└── Dockerfile           # Docker сборка
```

## GitHub API интеграция

Для отображения GitHub репозиториев в разделе Projects необходимо:

1. Создать [GitHub Personal Access Token](https://github.com/settings/tokens)
2. Добавить токен и имя пользователя в файл `.env`:
   ```
   GITHUB_USERNAME=your-github-username
   GITHUB_TOKEN=your-github-token
   ```

## Деплой

Проект готов к развертыванию на различных PaaS-платформах:

- **Netlify/Vercel**: Настройка для фронтенда с функциями для API
- **Railway/Render**: Полное приложение через Docker-развертывание
- **Собственный сервер**: Используйте Docker Compose для простого запуска