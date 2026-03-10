import type { FC } from "react";
import { Layout, Logo } from "@/shared/ui";
import { type IAuthForm } from "../model/types";
import styles from './auth-form.module.css';

const AuthForm: FC<IAuthForm> = ({ action, title, subtitle, children, footer }) => {
  const isFooterExist = Boolean(footer);

  return (
    <Layout isHolder>
      <form className={styles.form} action={action}>
        <Logo className={styles.form__logo} />
        <div className={styles.form__header}>
          {Boolean(title) && <div className={styles.form__title}>{title}</div>}
          {Boolean(subtitle) && <div className={styles.form__subtitle}>{subtitle}</div>}
        </div>
        <div className={styles.form__wrapper}>{children}{isFooterExist && <div className={styles.form__divider}>или</div>}</div>
        {isFooterExist && <div className={styles.form__footer}>{footer}</div>}
      </form>
    </Layout>
  )
};

export default AuthForm;
