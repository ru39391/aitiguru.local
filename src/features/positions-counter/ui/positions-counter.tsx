import type { FC } from "react";
import { ItemsCounter } from "@/entities/items-counter";
import { usePositionStore } from "@/entities/position";

const PositionsCounter: FC = () => {
  const { isLoading, pagination } = usePositionStore();

  return pagination ? <ItemsCounter {...pagination} isHidden={isLoading} /> : "";
};

export default PositionsCounter;
