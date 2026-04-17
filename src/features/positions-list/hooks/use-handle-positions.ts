import { useModalStore } from "@/shared/store";
import { useNotificationStore } from "@/shared/store";
import { usePositionStore } from "@/entities/position";
import { REMOVE_POSITION_SUCCEED } from "@/shared/constants";
import type { THandlePositions } from "../model/types";
import type { TPositionData } from "@/shared/types";

export const useHandlePositions = (): THandlePositions => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();
  const { removePosition } = usePositionStore();

  const handleRemoveItem = async (id: TPositionData["id"]) => {
    const success = await removePosition(id);

    if (!success) {
      return;
    }

    closeModal();
    addNotification({ title: REMOVE_POSITION_SUCCEED, type: "success" });
  };

  return {
    handleRemoveItem
  };
};
