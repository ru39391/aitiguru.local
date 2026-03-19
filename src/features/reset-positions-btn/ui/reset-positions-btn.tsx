import type { FC } from "react";
import { Button, Loader } from "@/shared/ui";
import { ResetIcon } from "@/shared/icons";
import { usePositionStore } from "@/entities/position";
import { resetPositions } from "../lib/reset-positions";
import { QUERY_KEY } from "@/shared/constants";

const ResetPositionsBtn: FC = () => {
  const { isLoading } = usePositionStore();

  return (
    <Button
      handleClick={() => resetPositions(QUERY_KEY)}
      isDisabled={isLoading}
      style="plain"
    >
      {isLoading ? <Loader isVisible={isLoading} size="xs" /> : <ResetIcon />}
    </Button>
  )
};

export default ResetPositionsBtn;
