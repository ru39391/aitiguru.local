import { ReactNode } from "react";

export interface ILoader {
  children: ReactNode;
  hasCircle?: boolean;
  isCircleHidden?: boolean;
  isVisible: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}
