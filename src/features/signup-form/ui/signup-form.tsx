import { type FC } from "react";
import { Link } from "react-router";
import { AuthForm } from "@/entities/auth-form";
import { Button, TextField } from "@/shared/ui";
import { routes } from "@/shared/constants";
import { useSignUp } from "../hooks/use-signup";

const SignUpFormFooter: FC = () => <>Есть аккаунт? <Link to={routes.public.login}>Войти</Link></>;

const SignUpForm: FC = () => {
  const { formState, dispatchForm, isPending } = useSignUp();

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
        }, {
          name: "email",
          label: "E-mail",
          type: "email",
          defaultValue: formState?.values?.email || "",
        }, {
          name: "password",
          label: "Пароль",
          type: "password",
          defaultValue: formState?.values?.password || "",
        }, {
          name: "confirm_password",
          label: "Повторите пароль",
          type: "password",
          defaultValue: formState?.values?.confirm_password || "",
        }
      ].map(({ defaultValue, label, name, type }) => (
        <TextField
          key={name}
          isRequired
          {...{
            defaultValue,
            icon: "",
            name,
            label,
            type
          }}
        />
      ))}
      <Button
        caption="Создать аккаунт"
        type="submit"
        isDisabled={isPending}
      />
    </AuthForm>
  )
};

export default SignUpForm;
// TODO: настроить isDisabled для Button
