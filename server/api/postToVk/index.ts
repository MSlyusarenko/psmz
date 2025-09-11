import { defineEventHandler, readMultipartFormData } from 'h3';
import axios from 'axios';
import FormData from 'form-data';
import { response } from 'express';

const VK_API_URL = 'https://api.vk.com/method/';
const API_VERSION = '5.131';

interface VkPostResponse {
  response?: {
    post_id: number;
  };
  error?: {
    error_code: number;
    error_msg: string;
  };
}

const sendPostToGroup = async (
  groupId: string,
  groupToken: string, // Ключ доступа сообщества
  userTokenSession: string,
  message: string,
  files: any[]
): Promise<VkPostResponse> => {
  try {
    // Шаг 1: Проверяем права доступа пользователя
    const permissionsResponse = await axios.get(`${VK_API_URL}account.getAppPermissions`, {
      params: {
        access_token: userTokenSession,
        v: API_VERSION,
      },
    });

    console.log('Права доступа:', permissionsResponse.data);

    // photos + wall --- 4 | 8192

    // Шаг 2: Получаем URL для загрузки фото (используем userTokenSession)
    const uploadServerResponse = await axios.get(`${VK_API_URL}photos.getWallUploadServer`, {
      params: {
        group_id: groupId,
        access_token: userTokenSession,
        v: API_VERSION,
      },
    });

    console.log('Ответ от VK API (photos.getWallUploadServer):', uploadServerResponse.data);

    // Проверяем на ошибки
    if (uploadServerResponse.data.error) {
      throw new Error('Ошибка VK API: ' + uploadServerResponse.data.error.error_msg);
    }

    if (!uploadServerResponse.data.response) {
      throw new Error('Не удалось получить URL для загрузки фото: ' + JSON.stringify(uploadServerResponse.data));
    }

    const uploadUrl = uploadServerResponse.data.response.upload_url;

    // Шаг 3: Загружаем фото на сервер VK
    const uploadFormData = new FormData();
    files.forEach((file, index) => {
      uploadFormData.append(`file${index}`, file.data, file.filename);
    });

    const uploadResponse = await axios.post(uploadUrl, uploadFormData, {
      headers: uploadFormData.getHeaders(),
    });

    console.log('Ответ от VK API (загрузка фото):', uploadResponse.data);

    const { server, photo, hash } = uploadResponse.data;

    // Шаг 4: Сохраняем фото на сервере VK (используем userTokenSession)
    let attachments = '';

    if (files.length > 0) {
      const savePhotoResponse = await axios.post(`${VK_API_URL}photos.saveWallPhoto`, null, {
        params: {
          group_id: groupId,
          server,
          photo,
          hash,
          access_token: userTokenSession,
          v: API_VERSION,
        },
      });

      if (savePhotoResponse.data.error) {
        throw new Error('VK API error: ' + savePhotoResponse.data.error.error_msg);
      }

      console.log('Ответ от VK API (сохранение фото):', savePhotoResponse.data);

      attachments = savePhotoResponse.data.response
        .map((p: any) => `photo${p.owner_id}_${p.id}`)
        .join(',');
    }

    // теперь attachments либо пустая строка, либо список фоток

    // Шаг 5: Формируем вложения
    //const attachments = savePhotoResponse.data.response
    //  .map((photo: any) => `photo${photo.owner_id}_${photo.id}`)
    //  .join(',');

    // Шаг 6: Публикуем пост с вложениями (используем groupToken)
    // const response = await axios.post<VkPostResponse>(`${VK_API_URL}wall.post`, null, {
    const response = await axios.post(`${VK_API_URL}wall.post`, null, {
      params: {
        owner_id: `-${groupId}`, // Отрицательное значение для групп
        message,
        attachments,
        from_group: 1, // Публикуем от имени группы
        access_token: userTokenSession, // Используем ключ доступа сообщества
        v: API_VERSION,
      },
    });

    console.log('Ответ от VK API (публикация поста):', response.data);

    return response.data;
  } catch (error) {
    console.error('Ошибка при публикации в группу ВК:', error.response ? error.response.data : error);
    throw error;
  }
};

export default defineEventHandler(async (event) => {
  try {
    // Читаем multipart/form-data (текст и файлы)
    const formData = await readMultipartFormData(event);
    console.log('Полученные данные:', formData);

    const body: any = {};
    const files: any[] = [];

    // Разделяем текст и файлы
    formData?.forEach((part) => {
      if (part.name === 'groupNumber' || part.name === 'message') {
        body[part.name] = part.data.toString();
      } else if (part.name === 'userTokenSession') {
        body[part.name] = part.data.toString();
      } else if (part.name?.startsWith('file')) {
        files.push(part);
      }
    });

    console.log('Тело запроса:', body);
    console.log('Файлы:', files);

    const { groupNumber, message, userTokenSession } = body;

    // Определяем ключ доступа сообщества и ID группы
    let groupToken: string | undefined;
    let groupId: string;

    switch (Number(groupNumber)) {
      case 1:
        groupToken = process.env.VK_TOKEN_GROUP_1;
        groupId = '223985586';
        break;
      case 2:
        groupToken = process.env.VK_TOKEN_GROUP_2;
        groupId = '202875113';
        break;
      case 3:
        groupToken = process.env.VK_TOKEN_GROUP_3;
        groupId = '227897853';
        break;
      default:
        throw new Error('Invalid group number');
    }

    if (!groupToken) {
      throw new Error('VK token is missing');
    }

    // Публикуем пост
    const result = await sendPostToGroup(groupId, groupToken, userTokenSession, message, files);
    console.log('Результат публикации:', result);

    return result;
  } catch (error) {
    console.error('Ошибка при обработке запроса:', error);
    throw error;
  }
});