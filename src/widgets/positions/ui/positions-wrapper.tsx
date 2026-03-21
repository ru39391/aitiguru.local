import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePositionForm } from "@/features/create-position-form";
import { Loader } from "@/shared/ui";
import { PositionsCounter } from "@/features/positions-counter";
import { PositionsList } from "@/features/positions-list";
import { PositionsPagination } from "@/features/positions-pagination";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { Wrapper } from "@/entities/wrapper";
import { usePositionStore } from "@/entities/position";

const PositionsWrapper: FC = () => {
  const { fetchPositions, isLoading } = usePositionStore();

  useEffect(() => {
    fetchPositions();
  }, []);

  return (
    <Wrapper
      aside={(
        <>
          <ResetPositionsBtn />
          <CreatePositionBtn><CreatePositionForm /></CreatePositionBtn>
        </>
      )}
      footer={(<><PositionsCounter /><PositionsPagination /></>)}
      title="Все позиции"
    >
      <Loader isVisible={isLoading}><PositionsList /></Loader>
    </Wrapper>
  )
};

export default PositionsWrapper;
