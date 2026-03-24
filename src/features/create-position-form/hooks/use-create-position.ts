import { useActionState } from "react";
import { useModalStore } from "@/shared/store";
import { useNotificationStore } from "@/shared/store";
import { usePositionStore } from "@/entities/position";
import { ADD_POSITION_SUCCEED } from "@/shared/constants";
import type { TFormHandler, TFormState, TPositionData } from "@/shared/types";

export const useCreatePosition = (): TFormHandler<Partial<TPositionData>> => {
  const { close: closeModal } = useModalStore();
  const { add: addNotification } = useNotificationStore();
  const {
    current: position,
    createPosition,
    setCurrPosition,
    updatePosition
  } = usePositionStore();

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<Partial<TPositionData>>> => {
    const { price, ...values } = Object.fromEntries(formData) as Partial<TPositionData>;
    const payload = { ...values, price: parseFloat(price) };

    const success = position ? await updatePosition(payload) : await createPosition(payload);

    if (success) {
      closeModal();
      setCurrPosition();
      addNotification({ title: ADD_POSITION_SUCCEED, type: "success" });
    }

    return {
      ...(!success && { values })
    };
  };

  const [formState, dispatchForm, isPending] = useActionState(submitForm(), {});

  return {
    formState,
    dispatchForm,
    isPending,
  };
};
