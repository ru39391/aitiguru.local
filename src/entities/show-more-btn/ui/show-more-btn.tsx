import type { FC } from "react";
import { Button } from "@/shared/ui";
import { DotsIcon } from "@/shared/icons";
import { type IShowMoreBtn } from "../model/types";

const ShowMoreBtn: FC<IShowMoreBtn> = ({ handleClick }) => <Button handleClick={handleClick} style="unstyled"><DotsIcon /></Button>;

export default ShowMoreBtn;
