import type { FC } from "react";
import type { ILoader } from "../model/types";
import styles from './loader.module.css';

const Loader: FC<ILoader> = ({ children, isVisible, size }) => {
  const classNameMod = `loader__icon_${size}`;
  const classNameValue = size ? `${styles.loader__icon} ${styles[classNameMod]}` : styles.loader__icon;

  return (
    isVisible
      ? <div className={styles.loader}>
          <svg className={classNameValue} viewBox="0 0 32 32" fill="none">
            <circle
              className={styles.loader__bg}
              cx="16"
              cy="16"
              r="14"
              stroke="currentColor"
              strokeWidth="4"
            />
            <circle
              className={styles.loader__circle}
              cx="16"
              cy="16"
              r="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </svg>
      </div>
      : children
  )
};

export default Loader;
