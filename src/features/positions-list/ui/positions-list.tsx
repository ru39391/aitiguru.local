import { useState, type FC } from "react";
import { Button } from "@/shared/ui";
import { Card } from "@/shared/ui";
import { EditIcon, TrashBinIcon } from "@/shared/icons";
import { Loader } from "@/shared/ui";
import { PositionItem } from "@/entities/position-item";
import { sortPositions } from "../lib/sort-positions";
import { useHandlePositions } from "../hooks/use-handle-positions";
import { useModalStore } from "@/shared/store";
import { usePositionStore, type TQueryData } from "@/entities/position";
import { type TPositionData } from "@/shared/types";
import styles from './positions-list.module.css';

const RemovePositionModal: FC<{
  id: TPositionData["id"];
  name: TPositionData["name"];
}> = ({ id, name }) => {
  const { close } = useModalStore();
  const { handleRemoveItem } = useHandlePositions();
  const { isLoading } = usePositionStore();

  return (
    <Card
      {...{
        title: "Удалить товар",
        subtitle: `Вы действительно хотите удалить товар ${name}?`,
        type: ["md"]
      }}
    >
      <div className={styles.positions__actions}>
        <Button
          handleClick={() => handleRemoveItem(id)}
          isDisabled={isLoading}
          style={isLoading ? "plain" : "row"}
        >
          {isLoading ? <Loader isVisible={isLoading} size="xs" /> : "Да"}
        </Button>
        <Button
          handleClick={() => close()}
          isDisabled={isLoading}
          style="plain"
        >
          Нет
        </Button>
      </div>
    </Card>
  )
};

const PositionsList: FC = () => {
  const [sortData, setSortData] = useState<TQueryData | null>(null);
  const { open } = useModalStore();
  const { data: positions, isLoading, setCurrPosition } = usePositionStore();

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
              onClick={() => sortColValues(name as keyof TPositionData)}
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
              <Button
                handleClick={() => setCurrPosition(id)}
                style="icon"
              >
                <EditIcon />
              </Button>
              <Button
                handleClick={() => open({ content: <RemovePositionModal {...{ id, name: props.name }} /> })}
                style="unstyled"
              >
                <TrashBinIcon />
              </Button>
            </div>
          </PositionItem>
        </div>
      ))}
    </div>
  )
};

export default PositionsList;
