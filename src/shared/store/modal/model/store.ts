import { create } from "zustand";
import { devtools } from "zustand/middleware";
import type { TModalStore, TModal } from "./types";

const initialState: TModal = {
  isOpen: false,
  content: "",
};

export const useModalStore = create<TModalStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      open: (config) => {
        set({
          isOpen: true,
          ...(config && { content: config.content }),
        });
      },

      close: () => set({ isOpen: false, content: "" }),

      toggle: () => set({ isOpen: !get().isOpen }),

      updateContent: (content) => set({ content }),
    }),
    { name: "ModalStore" },
  ),
);
