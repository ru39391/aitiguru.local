import { type FC } from "react";
import { Card, Logo } from "@/shared/ui";
import { type IForm } from "../model/types";
import styles from './form.module.css';

const Form: FC<IForm> = ({
  action,
  title,
  subtitle,
  children,
  footer,
  isLogoVisible = true,
  type,
  mod
}) => {
  const isFooterExist = Boolean(footer);
  const classMod = type ? `${styles.form__wrapper} ${styles[`form__wrapper_type_${type}`]}` : styles.form__wrapper;

  return (
    <form className={styles.form} action={action}>
      <Card
        {...{
          title,
          subtitle,
          header: isLogoVisible && <Logo className={styles.form__logo} />,
          type: mod
        }}
      >
        <div className={classMod}>{children}{isFooterExist && <div className={styles.form__divider}>или</div>}</div>
        {isFooterExist && <div className={styles.form__footer}>{footer}</div>}
      </Card>
    </form>
  )
};

export default Form;
