import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { positionApi } from "../lib/position-api";
import type { TPositionState, TPositionStore } from "./types";

const initialState: TPositionState = {
  data: [],
  current: null,
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
      updatePosition: async (payload) => {
        let isSucceed = false;

        set({ isLoading: true });

        try {
          const { data, success } = await positionApi.updateItem({ item: payload, arr: get().data });

          isSucceed = success;
          set({
            data,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }

        return isSucceed;
      },
      removePosition: async (id) => {
        let isSucceed = false;

        set({ isLoading: true });

        try {
          const {
            data,
            pagination,
            success
          } = await positionApi.removeItem({ id, arr: get().data, pagination: get().pagination });

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
      setCurrPosition: async (id = null) => {
        if(!id) {
          set({ current: null });
          return;
        }

        if(id === get().current?.id) {
          set({ current: null });
        }

        const current = [...get().data].find(item => Number(item.id) === Number(id));

        set({ current: current || null });
      }
    }),
    { name: "PositionStore" },
  ),
);
