import type { FC } from "react";
import { CreatePositionsBtn } from "@/features/create-position-btn";
import { PositionsList } from "@/features/positions-list";
import { RefreshPositionsBtn } from "@/features/refresh-positions-btn";
import { Wrapper } from "@/entities/wrapper";

const PositionsWrapper: FC = () => (
  <Wrapper title="Все позиции" aside={(<><RefreshPositionsBtn /><CreatePositionsBtn /></>)}>
    <PositionsList />
    тут пагинация
  </Wrapper>
);

export default PositionsWrapper;
