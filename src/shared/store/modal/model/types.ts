import type { ReactNode } from "react";

export type TModal = {
  isOpen: boolean;
  content: ReactNode;
}

export type TModalStore = TModal & {
  open: (config: { content: ReactNode; }) => void;
  close: () => void;
  toggle: () => void;
  updateContent: (content: ReactNode) => void;
}
