export interface SessionUser {
  id: number;
  vk_id: string;
  first_name: string;
  last_name: string;
  avatar: string;
  createdAt: string;
  user: string;
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
