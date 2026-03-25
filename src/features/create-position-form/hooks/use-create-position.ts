import { useActionState } from "react";
import { useModalStore } from "@/shared/store";
import { useNotificationStore, type TNotification } from "@/shared/store";
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

  const hidePopups = (data: Omit<TNotification, "id" | "createdAt">) => {
    closeModal();
    setCurrPosition();

    if(data) addNotification(data);
  }

  const updatePositionData = async ({ price, rating, ...data }: Partial<TPositionData>): Promise<boolean> => {
    const isValueDataEqual = Object.entries(data).reduce((acc, [key, value]) => acc && position[key] === value, true);
    const isPosDataExist = isValueDataEqual && parseFloat(position.price) === price && parseFloat(position.rating) === rating;

    if(isPosDataExist) {
      addNotification({ title: "Вы пытаетесь сохранить текущие данные" });

      return !isPosDataExist;
    };

    return await updatePosition({ ...position, price, rating: rating.toString(), ...data });
  }

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<Partial<TPositionData>>> => {
    const { price, rating, ...values } = Object.fromEntries(formData) as Partial<TPositionData>;
    const payload = { ...values, price: parseFloat(price), rating: parseFloat(rating) };

    const success = position ? await updatePositionData(payload) : await createPosition({ ...payload, rating: payload.rating?.toString() });

    if (success) {
      hidePopups({ title: ADD_POSITION_SUCCEED, type: "success" });
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
