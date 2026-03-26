import { type FC } from "react";
import { Link } from "react-router";
import { Form } from "@/entities/form";
import { Button, Checkbox, TextField } from "@/shared/ui";
import { CloseIcon, EnvelopeIcon, EyeCloseIcon, LockIcon, UserIcon } from "@/shared/icons";
import { Loader } from "@/shared/ui";
import { routes } from "@/shared/constants";
import { useValidateForm } from "@/shared/hooks";
import { useSignUp } from "../hooks/use-signup";

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
    <Form
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
          handleBlur: validatePlainField,
          handleChange: unsetInvalidData,
          handleFieldValue: (input: HTMLInputElement | null) => resetFieldValue(input)
        }, {
          icon: <EnvelopeIcon />,
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
          handleBlur: validatePwdField,
          handleChange: validateConfirmPwdField,
          handleFieldValue: (input: HTMLInputElement | null) => togglePwdField(input)
        }, {
          icon: <LockIcon />,
          name: "confirm_password",
          label: "Повторите пароль",
          type: "password",
          defaultValue: formState?.values?.confirm_password || "",
          handleBlur: validatePwdField,
          handleChange: validateConfirmPwdField,
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
            type,
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
    </Form>
  )
};

export default SignUpForm;
