import type { FC } from "react";
import type { IHeading } from "../model/types";
import styles from './heading.module.css';

const Heading: FC<IHeading> = ({ children, title }) => (
  <header className={styles.header}>
    <div className={styles.header__caption}>{title}</div>
    <div className={styles.header__aside}>{children}</div>
  </header>
);

export default Heading;
