import type { FC } from "react";
import { PositionItem } from "@/entities/position-item";
import { ShowMoreBtn } from "@/entities/show-more-btn";
import styles from './positions-list.module.css';

const PositionsList: FC = () => {
  const setClassName = (key: string): string => `${styles.positions__col} ${styles[`positions__col_type_${key}`]}`;
  const setRowClass = (keys: string[]): Record<string, string> => keys.reduce((acc, key) => ({ ...acc, [key]: setClassName(key) }), {});

  return (
    <div className={styles.positions}>
      <div className={`${styles.positions__row} ${styles.positions__row_type_caption}`}>
        {[{
          name: "name",
          caption: "Наименование"
        }, {
          name: "vendor",
          caption: "Вендор"
        }, {
          name: "article",
          caption: "Артикул"
        }, {
          name: "rating",
          caption: "Оценка"
        }, {
          name: "price",
          caption: "Цена, ₽"
        }].map(({ name, caption }) => (
          <div key={name} className={setClassName(name)}><span className={styles.positions__caption}>{caption}</span></div>
        ))}
      </div>
      {[...Array(5)].map((_, index) => ({
        id: index,
        img: "https://basket-14.wbbasket.ru/vol2091/part209126/209126820/images/big/1.webp",
        name: "USB Флэшкарта 16GB",
        category: "Аксессуары",
        vendor: "Samsung",
        article: "RCH45Q1A",
        rating: "4.3",
        price: 48652,
      })).map(({ id, ...props }) => (
        <div key={id.toString()} className={styles.positions__row}>
          <PositionItem classNames={setRowClass(Object.keys(props))} id={id.toString()} {...props}>
            <div className={styles.positions__col_type_btns}>
              <ShowMoreBtn handleClick={() => console.log("show context menu")} />
            </div>
          </PositionItem>
        </div>
      ))}
    </div>
  )
};

export default PositionsList;
