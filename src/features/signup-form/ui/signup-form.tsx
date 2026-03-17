import { type FC } from "react";
import { Link } from "react-router";
import { AuthForm } from "@/entities/auth-form";
import { Button, Checkbox, TextField } from "@/shared/ui";
import { CloseIcon, EnvelopeIcon, EyeCloseIcon, LockIcon, UserIcon } from "@/shared/icons";
import { Loader } from "@/shared/ui";
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
    resetFieldValue,
    togglePwdField,
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
          icon: <UserIcon />,
          name: "fullname",
          label: "ФИО",
          defaultValue: formState?.values?.fullname || "",
          handleBlur: validatePlainField as ITextFieldInput["handleBlur"],
          handleChange: unsetInvalidData,
          handleFieldValue: (input: HTMLInputElement | null) => resetFieldValue(input)
        }, {
          icon: <EnvelopeIcon />,
          name: "email",
          label: "E-mail",
          type: "email",
          defaultValue: formState?.values?.email || "",
          handleBlur: validateEmailField as ITextFieldInput["handleBlur"],
          handleChange: unsetInvalidData,
          handleFieldValue: (input: HTMLInputElement | null) => resetFieldValue(input)
        }, {
          icon: <LockIcon />,
          name: "password",
          label: "Пароль",
          type: "password",
          defaultValue: formState?.values?.password || "",
          handleBlur: validatePwdField as ITextFieldInput["handleBlur"],
          handleChange: validateConfirmPwdField as ITextFieldInput["handleChange"],
          handleFieldValue: (input: HTMLInputElement | null) => togglePwdField(input)
        }, {
          icon: <LockIcon />,
          name: "confirm_password",
          label: "Повторите пароль",
          type: "password",
          defaultValue: formState?.values?.confirm_password || "",
          handleBlur: validatePwdField as ITextFieldInput["handleBlur"],
          handleChange: validateConfirmPwdField as ITextFieldInput["handleChange"],
          handleFieldValue: (input: HTMLInputElement | null) => togglePwdField(input)
        }
      ].map(({
        defaultValue,
        handleBlur,
        handleChange,
        icon,
        label,
        name,
        type,
        handleFieldValue
      }) => (
        <TextField
          key={name}
          isRequired
          {...{
            defaultValue,
            errorValue: inputErrors[name] || "",
            handleFieldValue,
            icon,
            isBtnVisible: type === "password" ? true : inputErrors[name] !== undefined,
            name,
            label,
            type,
            ...(handleBlur && { handleBlur }),
            ...(handleChange && { handleChange }),
          }}
        >
          {type === "password" ? <EyeCloseIcon />: <CloseIcon />}
        </TextField>
      ))}
      <Checkbox
        caption="Запомнить данные"
        name="term"
      />
      <Button
        caption={!isPending ? "Создать аккаунт" : ""}
        isDisabled={isPending || isBtnDisabled}
        type="submit"
      >
        <Loader isVisible={isPending} size="xs" />
      </Button>
    </AuthForm>
  )
};

export default SignUpForm;
