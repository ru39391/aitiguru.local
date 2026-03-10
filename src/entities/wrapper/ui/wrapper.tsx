import type { FC } from "react";
import type { IWrapper } from "../model/types";
import styles from './wrapper.module.css';

const Wrapper: FC<IWrapper> = ({ aside, children, title }) => (
  <div className={styles.wrapper}>
    <div className={styles.wrapper__row}>
      <div className={styles.wrapper__title}>{title}</div>
      {Boolean(aside) && <div className={styles.wrapper__aside}>{aside}</div>}
    </div>
    {children}
  </div>
);

export default Wrapper;
