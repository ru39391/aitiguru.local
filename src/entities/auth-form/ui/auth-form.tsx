import type { FC } from "react";
import { Layout, Logo } from "@/shared/ui";
import { type IAuthForm } from "../model/types";
import styles from './auth-form.module.css';

const AuthForm: FC<IAuthForm> = ({ title, subtitle, children, footer }) => {
  const isFooterExist = Boolean(footer);

  return (
    <Layout isHolder>
      <div className={styles.holder}>
        <Logo />
        <div className={styles.header}>
          {Boolean(title) && <div className={styles.title}>{title}</div>}
          {Boolean(subtitle) && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
        <div className={styles.wrapper}>{children}{isFooterExist && <div className={styles.divider}>или</div>}</div>
        {isFooterExist && <div className={styles.footer}>{footer}</div>}
      </div>
    </Layout>
  )
};

export default AuthForm;
