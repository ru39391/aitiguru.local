import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { routes } from "@/shared/constants";
import { apiHandler } from "@/shared/api";
import type { TPositionData } from "@/shared/types";
import type { TPositionState, TPositionStore } from "./types";

const initialState: TPositionState = {
  data: [],
  pagination: null,
  isLoading: false,
};

export const usePositionStore = create<TPositionStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      fetchPositions: async () => {
        set({ isLoading: true });

        try {
          const { data: { data, ...pagination } } = await apiHandler.fetch<TPositionData[]>(routes.api.positions);

          set({
            data,
            pagination,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      createPosition: async (payload) => {
      },

      updatePosition: async (payload) => {
      },

      removePosition: async (payload) => {
      }
    }),
    { name: "PositionStore" },
  ),
);
