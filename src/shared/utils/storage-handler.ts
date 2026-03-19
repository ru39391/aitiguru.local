export class StorageHandler {
  static isDataExist(key: string) {
    return localStorage.getItem(key) !== null;;
  }

  static getData<T>(key: string): (T | null) {
    return this.isDataExist(key) ? JSON.parse(localStorage.getItem(key) as string) : null;
  }

  static removeData(key: string) {
    localStorage.removeItem(key);
  }

  static setData<T>(payload: T, key: string) {
    localStorage.setItem(key, JSON.stringify(payload));
  }

// TODO: настроить сохранение данных пагинации
// TODO: настроить поиск
// TODO: настроить модальное окно
// TODO: настроить создание/удаление товаров
// TODO: настроить прогресс бар
// TODO: настроить ya cloud
  static async handleData<T>(payload: T, key: string): Promise<{ success: boolean; data: T | null; }> {
    if (this.isDataExist(key)) {
      this.removeData(key);
      this.setData(payload, key);
    } else {
      this.setData(payload, key);
    }

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: this.isDataExist(key),
          data: this.isDataExist(key) ? JSON.parse(localStorage.getItem(key) as string) : null,
        })
      }, 200);
    });
  };
}
