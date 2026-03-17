import { create } from "zustand";
import { setStrId } from "@/shared/utils";
import { devtools } from "zustand/middleware";
import type { TNotificationStore, TNotification } from "./types";

export const useNotificationStore = create<TNotificationStore>()(
  devtools(
    (set, get) => ({
      data: [],

      add: (data) => {
        const id = setStrId();
        const item: TNotification = {
          ...data,
          id,
          createdAt: new Date(),
          duration: data.duration || 5000,
        };

        set((state) => ({ data: [...state.data, item] }));

        if (Number(item.duration) > 0) {
          setTimeout(() => {
            get().remove(id);
          }, item.duration);
        }
      },

      remove: (id) => {
        set((state) => ({ data: state.data.filter((item) => item.id !== id) }));
      },

      clear: () => {
        set({ data: [] });
      },

      clearByType: (type) => {
        set((state) => ({
          data: state.data.filter((item) => item.type !== type),
        }));
      },
    }),
    { name: "NotificationStore" },
  ),
);
