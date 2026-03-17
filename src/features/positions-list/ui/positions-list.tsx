import type { FC } from "react";
import { Button } from "@/shared/ui";
import { DotsIcon, PlusIcon } from "@/shared/icons";
import { PositionItem } from "@/entities/position-item";
import { usePositionStore } from "@/entities/position";
import styles from './positions-list.module.css';

const PositionsList: FC = () => {
  const { data: positions, isLoading } = usePositionStore();

  if(!isLoading && !positions.length) {
    return <div className={styles.positions}>Нет товаров в наличии</div>
  }

  const captions = {
    name: "Наименование",
    vendor: "Вендор",
    article: "Артикул",
    rating: "Оценка",
    price: "Цена, ₽",
  };

  const setClassName = (key: string): string => `${styles.positions__col} ${styles[`positions__col_type_${key}`]}`;
  const setRowClass = (keys: string[]): Record<string, string> => keys.reduce((acc, key) => ({ ...acc, [key]: setClassName(key) }), {});
  const sort = (name) => {
    if(!["price", "rating"].includes(name)) {
      return;
    }

    console.log(name);
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
              className={styles.positions__caption}
              onClick={() => sort(name)}
            >
              {caption}
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
