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
        let isSucceed = false;

        set({ isLoading: true });

        try {
          const {
            data,
            pagination,
            success
          } = await positionApi.addItem({ item: payload, arr: get().data, pagination: get().pagination });

          isSucceed = success;
          set({
            data,
            pagination,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }

        return isSucceed;
      },
      /*
      updatePosition: async (payload) => {
      },

      removePosition: async (payload) => {
      }
      */
    }),
    { name: "PositionStore" },
  ),
);
