import type { FC } from "react";
import { Link } from "react-router";
import { AuthForm } from "@/entities/auth-form";
import { routes } from "@/shared/constants";
import styles from './signin-form.module.css';

const SignInFormFooter: FC = () => <div className={styles.outro}>Нет аккаунта? <Link to={routes.public.signup}>Создать</Link></div>;

const SignInForm: FC = () => (
  <AuthForm
    title="Добро пожаловать!"
    subtitle="Пожалуйста, авторизируйтесь"
    footer={<SignInFormFooter />}
  >
    inputs
  </AuthForm>
);

export default SignInForm;
