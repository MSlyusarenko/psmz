import { defineEventHandler, readBody } from 'h3';
import { useDrizzle, eq } from '~~/server/utils/drizzle';
import { tables } from '~~/server/utils/drizzle';

export default defineEventHandler(async (event) => {
  const db = useDrizzle();
  
  // Преобразуем userId в число
  const userId = Number(event.context.params?.id);
  
  // Проверка на случай, если userId не определён или некорректен
  if (!userId) {
    return { success: false, error: 'Некорректный ID пользователя' };
  }

  // Чтение данных, которые нужно обновить
  const updatedData = await readBody(event);
  
  // Логируем полученные данные
  console.log('Updated data:', updatedData);

  try {
    // Обновление данных пользователя в таблице users
    await db.update(tables.users)
      .set({
        nickname: updatedData.nickname,
        city: String(updatedData.city), // Приведение к строке, если это требуется
        role: updatedData.role,
        position_psmz: updatedData.position_psmz,
        rank: updatedData.rank,
        bank: updatedData.bank
      })
      .where(eq(tables.users.id, userId)); // Здесь userId как число

    return { success: true };
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
    return { success: false, error: 'Ошибка при обновлении пользователя' };
  }
});
