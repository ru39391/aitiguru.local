import { useActionState } from "react";
import { useModalStore } from "@/shared/store";
import { usePositionStore } from "@/entities/position";
import type { TFormHandler, TFormState, TPositionData } from "@/shared/types";

export const useCreatePosition = (): TFormHandler<TPositionData> => {
  const { createPosition } = usePositionStore();

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<TPositionData>> => {
    const values = Object.fromEntries(formData) as TPositionData;

    console.log(values);
    return {
      values
    };

    /*
    // TODO: настроить метод createPosition
    //const res = await createPosition(values);

    if (res) {
      // TODO: закрыть модальное окно
    }

    return {
      ...(!res && { values })
    };
    */
  };

  const [formState, dispatchForm, isPending] = useActionState(submitForm(), {});

  return {
    formState,
    dispatchForm,
    isPending,
  };
};
