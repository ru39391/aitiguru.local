import { useEffect, type FC } from "react";
import { CreatePositionBtn } from "@/features/create-position-btn";
import { CreatePositionForm } from "@/features/create-position-form";
import { Loader } from "@/shared/ui";
import { PositionsCounter } from "@/features/positions-counter";
import { PositionsList } from "@/features/positions-list";
import { PositionsPagination } from "@/features/positions-pagination";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { Wrapper } from "@/entities/wrapper";
import { useModalStore } from "@/shared/store";
import { usePositionStore, type TPositionState } from "@/entities/position";

const PositionsWrapper: FC = () => {
  const { isOpen, open } = useModalStore();
  const {
    current: position,
    fetchPositions,
    isLoading,
    setCurrPosition
  } = usePositionStore();

  const openCreatePositionForm = (position: TPositionState["current"]) => {
    if(!position) return;

    open({ content: <CreatePositionForm /> });
  }

  const resetPositionData = (isOpen: boolean) => {
    if(isOpen) return;

    setCurrPosition(null);
  }

  useEffect(() => {
    fetchPositions(null);
  }, []);

  useEffect(() => {
    openCreatePositionForm(position);
  }, [position]);

  useEffect(() => {
    resetPositionData(isOpen);
  }, [isOpen]);

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
      <Loader hasCircle={false} isVisible={isLoading}><PositionsList /></Loader>
    </Wrapper>
  )
};

export default PositionsWrapper;
