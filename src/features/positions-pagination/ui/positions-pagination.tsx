import type { FC } from "react";
import { Pagination } from "@/entities/pagination";
import { usePositionStore } from "@/entities/position";

const PositionsPagination: FC = () => {
  const { fetchPositions, pagination } = usePositionStore();

  return pagination ? <Pagination {...pagination} handleClick={fetchPositions} /> : "";
};

export default PositionsPagination;
