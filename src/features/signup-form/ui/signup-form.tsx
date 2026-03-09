import type { FC } from "react";
import { Link } from "react-router";
import { AuthForm } from "@/entities/auth-form";
import { Button, TextField } from "@/shared/ui";
import { routes } from "@/shared/constants";

const SignUpFormFooter: FC = () => <>Есть аккаунт? <Link to={routes.public.login}>Войти</Link></>;

const SignUpForm: FC = () => (
  <AuthForm
    title="Добро пожаловать!"
    subtitle="Пожалуйста, зарегистрируйтесь"
    footer={<SignUpFormFooter />}
  >
    {[
      {
        name: "name",
        label: "ФИО",
      }, {
        name: "email",
        label: "E-mail",
        type: "email",
      }, {
        name: "login",
        label: "Логин",
      }, {
        name: "password",
        label: "Пароль",
        type: "password",
      }, {
        name: "confirm-password",
        label: "Повторите пароль",
        type: "password",
      }
    ].map(({ label, name, type }) => (
      <TextField
        key={name}
        isRequired
        {...{
          icon: "",
          name,
          label,
          type
        }}
      />
    ))}
    <Button caption="Создать аккаунт" />
  </AuthForm>
);

export default SignUpForm;
