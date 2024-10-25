// utils/cities.ts
export const cityNames: { [key: number]: string } = {
    1: "Мирный",
    2: "Приволжск",
    3: "Невский",
  };  
  
  export const getCityName = (cityId: number): string => {
    return cityNames[cityId] || "Неизвестный город"; // Возвращает "Неизвестный город", если ID не найден
  };
  