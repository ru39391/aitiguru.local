import { useActionState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore, type TSignUpFormData, type TSignUpPayload } from "@/entities/auth";
import { EXP_DEFAULT_VALUE } from "@/shared/constants";
import { routes } from "@/shared/constants";
import type { TFormHandler, TFormState } from "@/shared/types";

export const useSignUp = (): TFormHandler<TSignUpFormData> => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<TSignUpFormData>> => {
    const values = Object.fromEntries(formData) as TSignUpFormData;
    const payload: TSignUpPayload = { ...values, term: values.term ? EXP_DEFAULT_VALUE : 0 };

    const isAuth = await register(payload);

    if (isAuth) {
      navigate(routes.protected.home, { replace: true });
    }

    return {
      ...(!isAuth && { values })
    };
  };

  const [formState, dispatchForm, isPending] = useActionState(submitForm(), {});

  return {
    formState,
    dispatchForm,
    isPending,
  };
};
