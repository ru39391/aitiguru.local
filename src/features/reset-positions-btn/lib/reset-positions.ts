import { StorageHandler } from "@/shared/utils";
import { usePositionStore } from "@/entities/position";

const positionState = usePositionStore.getState();

const resetStorageData = (key: string): Promise<{ success: boolean; }> => {
  StorageHandler.removeData(key);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: !StorageHandler.isDataExist(key) })
    }, 200);
  });
};


export const resetPositions = async (key: string) => {
  const { success } = await resetStorageData(key);

  if(!success) {
    return;
  }

  positionState.fetchPositions();
}
