import type { FC } from "react";
import { Link } from "react-router";
import { Form } from "@/entities/form";
import { Button, Checkbox, Loader, TextField, type ITextField } from "@/shared/ui";
import { CloseIcon, EyeCloseIcon, LockIcon, UserIcon } from "@/shared/icons";
import { routes } from "@/shared/constants";
import { useValidateForm } from "@/shared/hooks";
import { useSignIn } from "../hooks/use-signin";

const SignInFormFooter: FC = () => <>Нет аккаунта? <Link to={routes.public.signup}>Создать</Link></>;

const SignInForm: FC = () => {
  const { formState, dispatchForm, isPending } = useSignIn();
  const {
    inputErrors,
    isBtnDisabled,
    resetFieldValue,
    togglePwdField,
    validateEmailField,
    validatePlainPwdField,
    unsetInvalidData
  } = useValidateForm();

  return (
    <Form
      action={dispatchForm}
      title="Добро пожаловать!"
      subtitle="Пожалуйста, авторизируйтесь"
      footer={<SignInFormFooter />}
    >
      {[
        {
          icon: <UserIcon />,
          name: "email",
          label: "E-mail",
          type: "email",
          defaultValue: formState?.values?.email || "",
          handleBlur: validateEmailField,
          handleChange: unsetInvalidData,
          handleFieldValue: (input: HTMLInputElement | null) => resetFieldValue(input)
        }, {
          icon: <LockIcon />,
          name: "password",
          label: "Пароль",
          type: "password",
          defaultValue: formState?.values?.password || "",
          handleBlur: validatePlainPwdField,
          handleChange: unsetInvalidData,
          handleFieldValue: (input: HTMLInputElement | null) => togglePwdField(input)
        }
      ].map(({
        name,
        type,
        ...props
      }) => (
        <TextField
          key={name}
          isRequired
          {...{
            ...props,
            errorValue: inputErrors[name] || "",
            isBtnVisible: type === "password" ? true : inputErrors[name] !== undefined,
            name,
            type: type  as Required<ITextField>["type"]
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
        caption={!isPending ? "Войти" : ""}
        isDisabled={isPending || isBtnDisabled}
        type="submit"
      >
        <Loader isVisible={isPending} size="xs" />
      </Button>
    </Form>
  )
};

export default SignInForm;
