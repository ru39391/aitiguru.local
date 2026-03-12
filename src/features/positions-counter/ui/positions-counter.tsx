import type { FC } from "react";
import { ItemsCounter } from "@/entities/items-counter";

const PositionsCounter: FC = () => <ItemsCounter {...{ first: 1, last: 20, length: 120 }} />;

export default PositionsCounter;
