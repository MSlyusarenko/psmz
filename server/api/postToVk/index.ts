import { defineEventHandler, readBody } from 'h3';
import axios from 'axios';

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

const sendPostToGroup = async (groupId: string, token: string, message: string): Promise<VkPostResponse> => {
    try {
      console.log('Отправка данных для публикации:', {
        owner_id: `-${groupId}`,
        message,
        from_group: 1,
        access_token: token,
        v: API_VERSION,
      });
  
      const response = await axios.post<VkPostResponse>(`${VK_API_URL}wall.post`, null, {
        params: {
          owner_id: `-${groupId}`,
          message,
          from_group: 1,
          access_token: token,
          v: API_VERSION,
        },
      });
  
      console.log('Ответ API:', response.data); // Логируем ответ от API
  
      return response.data;
    } catch (error) {
      console.error('Ошибка при публикации в группу ВК:', error.response ? error.response.data : error);
      throw error;
    }
  }
  

// Обработчик API-запроса с фронтенда
export default defineEventHandler(async (event) => {
  const body = await readBody(event); // Чтение тела запроса
  const { groupNumber, message } = body;

  let token: string | undefined;
  let groupId: string;

  switch (groupNumber) {
    case 1:
      token = process.env.VK_TOKEN_GROUP_1;
      groupId = '223985586';
      break;
    case 2:
      token = process.env.VK_TOKEN_GROUP_2;
      groupId = '202875113';
      break;
    case 3:
      token = process.env.VK_TOKEN_GROUP_3;
      groupId = '227897853';
      break;
    default:
      throw new Error('Invalid group number');
  }

  if (!token) {
    throw new Error('VK token is missing');
  }

  return sendPostToGroup(groupId, token, message);
});