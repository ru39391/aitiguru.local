import type { FC } from "react";
import { Loader } from "@/shared/ui";
import { Pagination } from "@/entities/pagination";
import { usePositionStore } from "@/entities/position";

const PositionsPagination: FC = () => {
  const { fetchPositions, isLoading, pagination } = usePositionStore();

  return pagination ? <Loader isCircleHidden={isLoading} isVisible={isLoading}><Pagination {...pagination} handleClick={fetchPositions} /></Loader> : "";
};

export default PositionsPagination;
