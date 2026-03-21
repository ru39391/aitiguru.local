import type { FC, ReactNode } from "react";
import { AddIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { useModalStore } from "@/shared/store";

const CreatePositionBtn: FC<{ children: ReactNode }> = ({ children }) => {
  const { open } = useModalStore();

  return <Button handleClick={() => open({ content: children })} caption="Добавить" style="row"><AddIcon /></Button>;
};

export default CreatePositionBtn;
