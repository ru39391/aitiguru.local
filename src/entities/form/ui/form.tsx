import { type FC } from "react";
import { Logo } from "@/shared/ui";
import { type IForm } from "../model/types";
import styles from './form.module.css';

const Form: FC<IForm> = ({ action, title, subtitle, children, footer, isLogoVisible = true }) => {
  const isFooterExist = Boolean(footer);

  // TODO: добавить стили для формы в модальном окне
  return (
    <form className={styles.form} action={action}>
      {isLogoVisible && <Logo className={styles.form__logo} />}
      <div className={styles.form__header}>
        {Boolean(title) && <div className={styles.form__title}>{title}</div>}
        {Boolean(subtitle) && <div className={styles.form__subtitle}>{subtitle}</div>}
      </div>
      <div className={styles.form__wrapper}>{children}{isFooterExist && <div className={styles.form__divider}>или</div>}</div>
      {isFooterExist && <div className={styles.form__footer}>{footer}</div>}
    </form>
  )
};

export default Form;
