export interface SidebarCategory {
    id: number;
    title: string;
    isSeparated: boolean;
    isCollapsed: boolean;
    filter?: (...args: any[]) => boolean;
    links: SidebarLink[];
  }
  
  export interface SidebarLink {
    title: string;
    icon: string;
    url: string;
    inNewTab?: boolean;
    filter?: (...args: any[]) => boolean;
  }
  