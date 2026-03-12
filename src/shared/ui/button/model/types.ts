import type { ReactNode } from "react";

export interface IButton {
  caption?: string;
  children?: ReactNode;
  handleClick?: () => void;
  style?: "unstyled" | "icon" | "plain" | "row";
  type?: "button" | "submit";
}
