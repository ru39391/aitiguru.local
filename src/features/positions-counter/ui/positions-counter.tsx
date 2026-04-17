
import type { FC } from "react";
import { ItemsCounter } from "@/entities/items-counter";
import { Loader } from "@/shared/ui";
import { usePositionStore } from "@/entities/position";

const PositionsCounter: FC = () => {
  const { isLoading, pagination } = usePositionStore();

  return pagination ? <Loader isCircleHidden={isLoading} isVisible={isLoading}><ItemsCounter {...pagination} /></Loader> : "";
};

export default PositionsCounter;
