import type { FC } from "react";
import { Link } from "react-router";
import { AuthForm } from "@/entities/auth-form";
import { InputBtn } from "@/entities/input-btn";
import { Button, TextField } from "@/shared/ui";
import { CloseIcon, EyeIcon, LockIcon, UserIcon } from "@/shared/icons";
import { routes } from "@/shared/constants";
import { useSignIn } from "../hooks/use-signin";

const LoginInputBtn: FC = () => {

  return <InputBtn handleClick={() => console.log('CloseIcon')}><EyeIcon /></InputBtn>;
};

const SignInFormFooter: FC = () => <>Нет аккаунта? <Link to={routes.public.signup}>Создать</Link></>;

const SignInForm: FC = () => {
  const { formState, dispatchForm, isPending } = useSignIn();

  console.log({formState});
  return (
    <AuthForm
      action={dispatchForm}
      title="Добро пожаловать!"
      subtitle="Пожалуйста, авторизируйтесь"
      footer={<SignInFormFooter />}
    >
      {[
        {
          icon: <UserIcon />,
          label: "Логин",
          name: "login",
          type: "text",
        }, {
          icon: <LockIcon />,
          label: "Пароль",
          name: "password",
          type: "password",
        }
      ].map(({ name, ...props }) => (
        <TextField
          key={name}
          isRequired
          {...props}
        >
          <LoginInputBtn />
        </TextField>
      ))}
      <Button caption="Войти" type="submit" isDisabled={isPending} />
    </AuthForm>
  )
};

export default SignInForm;
