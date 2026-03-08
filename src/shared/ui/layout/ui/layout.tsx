import type { FC } from "react";
import type { ILayout } from "../model/types";
import styles from './layout.module.css';

const Layout: FC<ILayout> = ({ children }) => (
  <div className={styles.wrapper}>{children}</div>
);

export default Layout;
