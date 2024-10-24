export interface SessionUser {
  id: number;
  vk_id: string;
  first_name: string;
  last_name: string;
  nickname: string;
  city: string;
  avatar: string;
  createdAt: string;
  donate: number | null;
  position_psmz?: string; // Новое поле для должности в ПСМЗ
  position_mz?: string;   // Новое поле для должности в МЗ
  rank?: string;          // Новое поле для ранга
  bank?: string;          // Новое поле для банка
}


export interface SidebarCategory {
  id: number;
  title: string;
  links: {
    title: string;
    icon: string;
    url: string;
  }[];
  isCollapsed?: boolean; // Добавляем это свойство
  isSeparated?: boolean; // Если нужно, добавьте и это
}
