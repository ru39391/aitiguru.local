import type { FC } from "react";
import { Button, Loader } from "@/shared/ui";
import { ResetIcon } from "@/shared/icons";
import { usePositionStore } from "@/entities/position";

const ResetPositionsBtn: FC = () => {
  const { fetchPositions, isLoading } = usePositionStore();

  return (
    <Button
      handleClick={() => fetchPositions()}
      isDisabled={isLoading}
      style="plain"
    >
      {isLoading ? <Loader isVisible={isLoading} size="xs" /> : <ResetIcon />}
    </Button>
  )
};

export default ResetPositionsBtn;
