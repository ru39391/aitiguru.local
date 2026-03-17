import { ReactNode } from "react";

export interface ILoader {
  children: ReactNode;
  isVisible: boolean;
  size?: "xs" | "sm" | "md" | "lg";
}
