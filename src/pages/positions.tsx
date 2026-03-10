import type { FC } from "react";
import { Layout } from "@/shared/ui";
import { PositionsHeader, PositionsWrapper } from "@/widgets/positions";

const Positions: FC = () => (
  <Layout><PositionsHeader /><PositionsWrapper /></Layout>
);

export default Positions;
