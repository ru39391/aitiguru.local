import type { FC } from "react";
import { Pagination } from "@/entities/pagination";
import { usePositionStore } from "@/entities/position";

const PositionsPagination: FC = () => {
  const { fetchPositions, isLoading, pagination } = usePositionStore();

  return pagination ? <Pagination {...pagination} handleClick={fetchPositions} isHidden={isLoading} /> : "";
};

export default PositionsPagination;
