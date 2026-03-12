import type { FC } from "react";
import { Button } from "@/shared/ui";
import { ResetIcon } from "@/shared/icons";

const ResetPositionsBtn: FC = () => (
  <Button handleClick={() => console.log("get positions list")} style="plain"><ResetIcon /></Button>
);

export default ResetPositionsBtn;
