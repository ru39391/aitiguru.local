import type { FC } from "react";
import type { ILayout } from "../model/types";
import styles from './layout.module.css';

const Layout: FC<ILayout> = ({ isHolder, children }) => {
  const className = isHolder ? `${styles.wrapper} ${styles.wrapper_type_centered}` : styles.wrapper;

  return <div className={className}>{children}</div>;
};

export default Layout;
