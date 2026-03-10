import { useActionState } from "react";
import { useNavigate } from "react-router";

export const useSignIn = () => { //: IFormHook<TLoginPayload>
  //const { login } = useAuthStore();
  const navigate = useNavigate();

  const submitForm = () => console.log('submitForm');/*
    () =>
    async (
      _: unknown,
      formData: FormData,
    ): Promise<TFormState<TLoginPayload>> => {
      const values = Object.fromEntries(formData) as TLoginPayload;
      const { message, success } = await login(values);

      if (success) {
        navigate(routes.protected.home, { replace: true });
      }

      return {
        message: message || "",
        ...(!success && { values }),
      };
    };
    */

  const [formState, dispatchForm, isPending] = useActionState(submitForm(), {
    message: "",
  });

  return {
    formState,
    dispatchForm,
    isPending,
  };
};
