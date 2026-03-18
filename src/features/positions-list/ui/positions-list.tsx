import { useState, type FC } from "react";
import { Button } from "@/shared/ui";
import { DotsIcon, PlusIcon } from "@/shared/icons";
import { PositionItem } from "@/entities/position-item";
import { sortPositions } from "../lib/sort-positions";
import { usePositionStore, type TQueryData } from "@/entities/position";
import { type TPositionData } from "@/shared/types";
import styles from './positions-list.module.css';

const PositionsList: FC = () => {
  const [sortData, setSortData] = useState<TQueryData>(null);
  const { data: positions, isLoading } = usePositionStore();

  const captions = {
    name: "Наименование",
    vendor: "Вендор",
    article: "Артикул",
    rating: "Оценка",
    price: "Цена, ₽",
  };

  const setClassName = (key: string): string => `${styles.positions__col} ${styles[`positions__col_type_${key}`]}`;
  const setRowClass = (keys: string[]): Record<string, string> => keys.reduce((acc, key) => ({ ...acc, [key]: setClassName(key) }), {});
  const sortColValues = async (name: keyof TPositionData) => {
    const arr = ["price", "rating"] as (keyof TPositionData)[];

    if(!arr.includes(name)) {
      return;
    }

    const data = await sortPositions(name as TQueryData["sortby"]);

    setSortData(data);
  }

  if(!isLoading && !positions.length) {
    return <div className={styles.positions}>Нет товаров в наличии</div>
  }

  return (
    <div className={styles.positions}>
      <div className={`${styles.positions__row} ${styles.positions__row_type_caption}`}>
        {Object.entries(captions).reduce(
          (acc, [key, value]) => [...acc, { name: key, caption: value }],
          [] as Record<string,string>[]
        ).map(({ name, caption }) => (
          <div key={name} className={setClassName(name)}>
            <span
              className={`${styles.positions__caption} ${styles[`positions__caption_type_${name}`]}`}
              onClick={() => sortColValues(name)}
            >
              {caption}
              {sortData?.sortby === name && sortData?.sortdir === "ASC" && <span className={styles.positions__sortdir}>▲</span>}
              {sortData?.sortby === name && sortData?.sortdir === "DESC" && <span className={styles.positions__sortdir}>▼</span>}
            </span>
          </div>
        ))}
      </div>
      {positions.map(({ id, ...props }) => (
        <div key={id.toString()} className={styles.positions__row}>
          <PositionItem
            id={id.toString()}
            classNames={setRowClass(Object.keys(props))}
            captions={captions}
            {...props}
          >
            <div className={styles.positions__col_type_btns}>
              <Button handleClick={() => console.log(`edit ${props.name}, id = ${id.toString()}`)} style="icon">
                <PlusIcon />
              </Button>
              <Button handleClick={() => console.log(`show context menu for ${props.name}, id = ${id.toString()}`)} style="unstyled">
                <DotsIcon />
              </Button>
            </div>
          </PositionItem>
        </div>
      ))}
    </div>
  )
};

export default PositionsList;
