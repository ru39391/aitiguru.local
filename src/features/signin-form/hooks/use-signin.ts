import { useActionState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore, type TSignInPayload } from "@/entities/auth";
import { EXP_DEFAULT_VALUE } from "@/shared/constants";
import { routes } from "@/shared/constants";
import type { TFormHandler, TFormState } from "@/shared/types";

export const useSignIn = (): TFormHandler<TSignInPayload> => {
  const { login } = useAuthStore();
  const navigate = useNavigate();

    const submitForm = () => async (
      _: unknown,
      formData: FormData
    ): Promise<TFormState<TSignInPayload>> => {
      const { term, ...values } = Object.fromEntries(formData) as TSignInPayload;

      const res = await login({ ...values, term: term ? EXP_DEFAULT_VALUE : 0 });

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
