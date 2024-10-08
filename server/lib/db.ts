import * as dotenv from 'dotenv';
import { Pool } from 'pg'

// Загружаем переменные окружения из .env
dotenv.config();

// Создаем пул соединений с базой данных
const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // Используем DATABASE_URL из .env
  ssl: {
    rejectUnauthorized: false, // Для Neon обычно требуется это
  },
});

// Функция для выполнения запросов к базе данных
export async function query(text: string, values?: any[]) {
  const client = await pool.connect(); // Получаем клиента из пула
  try {
    const res = await client.query(text, values); // Выполняем запрос
    return res; // Возвращаем результат
  } finally {
    client.release(); // Освобождаем клиента обратно в пул
  }
}

// Экспортируем функцию query для использования в других частях приложения
export default { query };
