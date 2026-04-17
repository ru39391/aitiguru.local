import { type FC } from "react";
import { type ILinearProgress } from "../model/types";
import styles from './linear-progress.module.css';

const LinearProgress: FC<ILinearProgress> = ({ progress }) => {
  const clampedProgress = Math.min(100, Math.max(0, progress));

  return (
    <div className={styles.runner}>
      <div className={styles.runner__track}>
        <div
          className={styles.runner__bg}
          style={{
            width: `${clampedProgress}%`,
          }}
        >
          <span className={styles.runner__label}>{clampedProgress}%</span>
        </div>
      </div>
    </div>
  );
};

export default LinearProgress;
