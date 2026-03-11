import { type FC, useState } from "react";
import { formatCurrency } from "@/shared/utils";
import type { IPositionItem } from "../model/types";
import styles from './position-item.module.css';

const PositionMeta: FC<{
  category: IPositionItem["category"];
  id: IPositionItem["id"];
  img: IPositionItem["img"];
  name: IPositionItem["name"];
}> = ({ category, id, img, name }) => {
  const [isChecked, setChecked] = useState<boolean>(false);

  return (
    <div className={styles.meta}>
      <input id={id} className={styles.meta__toggler} type="checkbox" onChange={() => setChecked(!isChecked)} checked={isChecked} />
      <label htmlFor={id} className={isChecked ? `${styles.meta__label} ${styles.meta__label_checked}` : styles.meta__label}></label>
      <div className={styles.meta__row}>
        {Boolean(img) && <div className={styles.meta__picture}>
          <img className={styles.meta__img} src={img} alt={name} />
        </div>}
        <div className={styles.meta__title}>{name}</div>
        {Boolean(category) && <div className={styles.meta__subtitle}>{category}</div>}
      </div>
    </div>
  )
};

const PositionPrice: FC<{ price: IPositionItem["price"]; }> = ({ price }) => <>{formatCurrency(price)}<span className={styles.meta__price}>, 00</span></>;

const PositionItem: FC<IPositionItem> = ({ category, children, classNames, id, img, ...props }) => (
  <>
    {Object.entries(props).map(([key, value]) => (
      key === "name"
        ? <PositionMeta key={key} {...{ category, img, name: props.name, id }} />
        : <div key={key} className={classNames[key]}>{key === "price" ? (<PositionPrice price={value} />) : value}{key === "rating" && "/5"}</div>
    ))}
    {children}
  </>
);

export default PositionItem;
