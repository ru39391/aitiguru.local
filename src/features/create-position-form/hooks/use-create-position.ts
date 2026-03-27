import { useActionState } from "react";
import { useModalStore } from "@/shared/store";
import { useNotificationStore, type TNotification } from "@/shared/store";
import { usePositionStore } from "@/entities/position";
import { ADD_POSITION_SUCCEED } from "@/shared/constants";
import type { TFormHandler, TFormState, TPositionData, TPositionPayload } from "@/shared/types";
import type { TPositionTextValues } from "../model/types";

export const useCreatePosition = (): TFormHandler<TPositionPayload> => {
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
    setCurrPosition(null);

    if(data) addNotification(data);
  }

  const updatePositionData = async (
    { price, rating, ...data }: (TPositionTextValues & Pick<TPositionData, "price" | "rating">)
  ): Promise<boolean> => {
    const isValueDataEqual = Object.entries(data as TPositionTextValues).reduce(
      (acc, [key, value]) => position === null ? !acc : acc && position[key as keyof TPositionTextValues] === value,
      true
    );
    const isPosDataExist = isValueDataEqual && position?.price === price && position?.rating === rating;

    if(isPosDataExist) {
      addNotification({ title: "Вы пытаетесь сохранить текущие данные" });

      return !isPosDataExist;
    };

    return await updatePosition({ ...( position && { ...position }), price, rating, ...data } as TPositionData);
  }

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<TPositionPayload>> => {
    const values = Object.fromEntries(formData) as TPositionPayload;
    const payload = { ...values, price: parseFloat(values.price), rating: parseFloat(values.rating) };

    const success = position
      ? await updatePositionData(payload as (TPositionTextValues & Pick<TPositionData, "price" | "rating">))
      : await createPosition({ ...payload, rating: payload.rating.toString() });

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
