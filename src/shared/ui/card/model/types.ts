import type { ReactNode } from "react";

export interface ICard {
  title: string;
  subtitle?: string;
  children: ReactNode;
  header?: ReactNode;
  type?: string[];
}
