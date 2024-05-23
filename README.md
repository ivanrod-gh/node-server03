 # node-server03

Тестовый сервер на Node.js

Запуск: `npm run start`

Запускается на `localhost:3000`

Поддерживает следующие запросы:
- GET `localhost:3000/users`
- GET `localhost:3000/users/id`
- POST `localhost:3000/users`
- DELETE `localhost:3000/users/id`
- PUT `localhost:3000/users/id`

, где `id` - идентификатор пользователя

Подключена БД `sqlite3`