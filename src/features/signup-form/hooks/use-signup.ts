import { useActionState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore, type TSignUpPayload } from "@/entities/auth";
import { routes } from "@/shared/constants";
import type { TFormHandler, TFormState } from "@/shared/types";

export const useSignUp = (): TFormHandler<TSignUpPayload> => {
  const { register } = useAuthStore();
  const navigate = useNavigate();

  const submitForm = () => async (
    _: unknown,
    formData: FormData
  ): Promise<TFormState<TSignUpPayload>> => {
    const values = Object.fromEntries(formData) as TSignUpPayload;

    const res = await register(values);

    if (res) {
      navigate(routes.protected.home, { replace: true });
    }

    return {
      ...(!res && { values })
    };
  };

  const [formState, dispatchForm, isPending] = useActionState(submitForm(), {});

  return {
    formState,
    dispatchForm,
    isPending,
  };
};
