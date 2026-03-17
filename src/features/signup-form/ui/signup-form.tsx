import { type FC } from "react";
import { Link } from "react-router";
import { AuthForm } from "@/entities/auth-form";
import { Button, Checkbox, TextField } from "@/shared/ui";
import { routes } from "@/shared/constants";
import { useValidateForm } from "@/shared/hooks";
import { useSignUp } from "../hooks/use-signup";
import type { ITextFieldInput } from "@/shared/ui/text-field";

const SignUpFormFooter: FC = () => <>Есть аккаунт? <Link to={routes.public.login}>Войти</Link></>;

const SignUpForm: FC = () => {
  const { formState, dispatchForm, isPending } = useSignUp();
  const {
    inputErrors,
    isBtnDisabled,
    validateEmailField,
    validatePlainField,
    validatePwdField,
    validateConfirmPwdField,
    unsetInvalidData
  } = useValidateForm();

  return (
    <AuthForm
      action={dispatchForm}
      title="Добро пожаловать!"
      subtitle="Пожалуйста, зарегистрируйтесь"
      footer={<SignUpFormFooter />}
    >
      {[
        {
          name: "fullname",
          label: "ФИО",
          defaultValue: formState?.values?.fullname || "",
          handleBlur: validatePlainField as ITextFieldInput["handleBlur"],
          handleChange: unsetInvalidData,
        }, {
          name: "email",
          label: "E-mail",
          type: "email",
          defaultValue: formState?.values?.email || "",
          handleBlur: validateEmailField as ITextFieldInput["handleBlur"],
          handleChange: unsetInvalidData,
        }, {
          name: "password",
          label: "Пароль",
          type: "password",
          defaultValue: formState?.values?.password || "",
          handleBlur: validatePwdField as ITextFieldInput["handleBlur"],
          handleChange: validateConfirmPwdField as ITextFieldInput["handleChange"]
        }, {
          name: "confirm_password",
          label: "Повторите пароль",
          type: "password",
          defaultValue: formState?.values?.confirm_password || "",
          handleBlur: validatePwdField as ITextFieldInput["handleBlur"],
          handleChange: validateConfirmPwdField as ITextFieldInput["handleChange"]
        }
      ].map(({
        defaultValue,
        handleBlur,
        handleChange,
        label,
        name,
        type
      }) => (
        <TextField
          key={name}
          isRequired
          {...{
            defaultValue,
            errorValue: inputErrors[name] || "",
            icon: "",
            name,
            label,
            type,
            ...(handleBlur && { handleBlur }),
            ...(handleChange && { handleChange })
          }}
        />
      ))}
      <Checkbox
        caption="Запомнить данные"
        name="term"
      />
      <Button
        caption="Создать аккаунт"
        isDisabled={isPending || isBtnDisabled}
        type="submit"
      />
    </AuthForm>
  )
};

export default SignUpForm;
