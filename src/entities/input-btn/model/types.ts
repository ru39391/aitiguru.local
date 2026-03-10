import type { ReactNode } from "react";

export interface IInputBtn {
  children: ReactNode;
  handleClick: () => void;
}
