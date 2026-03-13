import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authApi } from "../lib/auth-api";
import type { TAuthState, TAuthStore } from "./types";

const initialState: TAuthState = {
  user: null,
  isLoading: false,
};

export const useAuthStore = create<TAuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      register: async (payload) => {
        set({ isLoading: true });

        try {
          /*
          await authApi.signUp(payload);

          set({
            data,
            isLoading: false,
          });
          */
        } finally {
          set({ isLoading: false });
        }
      },
    }),
    { name: "AuthStore" },
  ),
);
