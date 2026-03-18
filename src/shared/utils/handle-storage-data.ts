import { QUERY_KEY } from "@/shared/constants";

export const isStorageDataExist = (key: string = QUERY_KEY) => localStorage.getItem(key) !== null;

export const getStorageData = <T>(key: string = QUERY_KEY): (T | null) => isStorageDataExist(key) ? JSON.parse(localStorage.getItem(key) as string) : null;

const setStorageData = <T>(payload: T, key: string = QUERY_KEY) => {
  localStorage.setItem(key, JSON.stringify(payload))
};

// TODO: настроить сохранение данных пагинации
// TODO: настроить поиск
// TODO: настроить модальное окно
// TODO: настроить создание/удаление товаров
// TODO: настроить прогресс бар
// TODO: настроить ya cloud
export const handleStorageData = async <T>(payload: T, key: string = QUERY_KEY): Promise<{ success: boolean; data: T | null; }> => {
  if (isStorageDataExist(key)) {
    localStorage.removeItem(key);
    setStorageData(payload, key);
  } else {
    setStorageData(payload, key);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: isStorageDataExist(key),
        data: isStorageDataExist(key) ? JSON.parse(localStorage.getItem(key) as string) : null,
      })
    }, 200);
  });
};
