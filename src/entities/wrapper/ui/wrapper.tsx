import type { FC } from "react";
import type { IWrapper } from "../model/types";
import styles from './wrapper.module.css';

const Wrapper: FC<IWrapper> = ({ aside, children, footer, title }) => (
  <div className={styles.wrapper}>
    <div className={styles.wrapper__heading}>
      <div className={styles.wrapper__title}>{title}</div>
      {Boolean(aside) && <div className={styles.wrapper__aside}>{aside}</div>}
    </div>
    <div className={styles.wrapper__container}>{children}</div>
    {Boolean(footer) && <div className={styles.wrapper__footer}>{footer}</div>}
  </div>
);

export default Wrapper;
