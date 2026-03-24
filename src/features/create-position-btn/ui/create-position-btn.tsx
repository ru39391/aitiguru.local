import type { FC, ReactNode } from "react";
import { AddIcon } from "@/shared/icons";
import { Button } from "@/shared/ui";
import { useModalStore } from "@/shared/store";
import { usePositionStore } from "@/entities/position";

const CreatePositionBtn: FC<{ children: ReactNode }> = ({ children }) => {
  const { open } = useModalStore();
  const { setCurrPosition } = usePositionStore();

  const openPositionModal = (content: ReactNode) => {
    setCurrPosition();
    open({ content });
  }

  return <Button handleClick={() => openPositionModal(children)} caption="Добавить" style="row"><AddIcon /></Button>;
};

export default CreatePositionBtn;
