import { useEffect, type FC } from "react";
import { Layout } from "@/shared/ui";
import { PositionsHeader, PositionsWrapper } from "@/widgets/positions";

const Positions: FC = () => {
  useEffect(() => {
    document.title = "Все позиции";
  }, []);

  return <Layout><PositionsHeader /><PositionsWrapper /></Layout>
};

export default Positions;
