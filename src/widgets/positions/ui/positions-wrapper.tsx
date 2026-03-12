import type { FC } from "react";
import { CreatePositionsBtn } from "@/features/create-position-btn";
import { PositionsCounter } from "@/features/positions-counter";
import { PositionsList } from "@/features/positions-list";
import { PositionsPagination } from "@/features/positions-pagination";
import { ResetPositionsBtn } from "@/features/reset-positions-btn";
import { Wrapper } from "@/entities/wrapper";

const PositionsWrapper: FC = () => (
  <Wrapper
    aside={(<><ResetPositionsBtn /><CreatePositionsBtn /></>)}
    footer={(<><PositionsCounter /><PositionsPagination /></>)}
    title="Все позиции"
  >
    <PositionsList />
  </Wrapper>
);

export default PositionsWrapper;
