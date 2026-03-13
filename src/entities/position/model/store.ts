import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { positionApi } from "../lib/position-api";
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

      fetchPositions: async (payload = null) => {
        set({ isLoading: true });

        try {
          const { data, pagination } = await positionApi.fetchItems(payload);

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
