import type { FC } from "react";
import { Layout, Logo } from "@/shared/ui";
import { type IAuthForm } from "../model/types";
import styles from './auth-form.module.css';

const AuthForm: FC<IAuthForm> = ({ title, subtitle, children, footer }) => (
  <Layout>
    <div className={styles.holder}>
      <div className={styles.header}>
        <div className={styles.logo}><Logo /></div>
        {Boolean(title) && <div className={styles.title}>{title}</div>}
        {Boolean(subtitle) && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
      <div className={styles.wrapper}>{children}</div>
      {Boolean(footer) && <div className={styles.footer}><div className={styles.divider}>или</div>{footer}</div>}
    </div>
  </Layout>
);

export default AuthForm;
