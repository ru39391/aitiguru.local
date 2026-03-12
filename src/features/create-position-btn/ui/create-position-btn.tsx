import type { FC } from "react";
import { AddIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";

const CreatePositionsBtn: FC = () => (
  <Button handleClick={() => console.log("show add position form")} caption="Добавить" style="row"><AddIcon /></Button>
);

export default CreatePositionsBtn;
