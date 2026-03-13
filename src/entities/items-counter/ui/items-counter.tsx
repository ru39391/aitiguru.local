import type { FC } from "react";
import type { IItemsCounter } from "../model/types";
import styles from './items-counter.module.css';

const ItemsCounter: FC<IItemsCounter> = ({ page, perPage, totalCount }) => {
  const firstItem = (page - 1) * perPage + 1;
  const lastItem = Math.min(page * perPage, totalCount);

  return (
    <div className={styles.counter}>
      Показано <span className={styles.counter__value}>{firstItem === lastItem ? firstItem : `${firstItem}-${lastItem}`}</span> из <span className={styles.counter__value}>{totalCount.toString()}</span>
    </div>
  )
};

export default ItemsCounter;
