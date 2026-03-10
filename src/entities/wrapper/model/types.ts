import type { ReactNode } from "react";

export interface IWrapper {
  aside?: ReactNode;
  children: ReactNode;
  title: string;
}
