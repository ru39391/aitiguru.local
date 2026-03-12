import type { FC } from "react";
import type { IItemsCounter } from "../model/types";
import styles from './items-counter.module.css';

const ItemsCounter: FC<IItemsCounter> = ({ first, last, length }) => (
  <div className={styles.counter}>
    Показано <span className={styles.counter__value}>{first.toString()}-{last.toString()}</span> из <span className={styles.counter__value}>{length.toString()}</span>
  </div>
);

export default ItemsCounter;
