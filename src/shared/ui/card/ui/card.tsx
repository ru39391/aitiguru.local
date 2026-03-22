import { type FC } from "react";
import { type ICard } from "../model/types";
import styles from './card.module.css';

const Card: FC<ICard> = ({ children, header, title, type, subtitle }) => {
  const classMod = type
    ? type.reduce((acc, value) => `${acc} ${styles[`card_size_${value}`]}`, styles.card)
    : styles.card;

  return (
    <div className={classMod}>
      {header}
      {Boolean(title) && <div className={styles.card__header}>
        <div className={styles.card__title}>{title}</div>
        {Boolean(subtitle) && <div className={styles.card__subtitle}>{subtitle}</div>}
      </div>}
      {children}
    </div>
  )
};

export default Card;
