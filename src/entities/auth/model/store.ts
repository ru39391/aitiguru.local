import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { authApi } from "../lib/auth-api";
import type { TAuthState, TAuthStore, TSignUpPayload } from "./types";

const initialState: TAuthState = {
  user: null,
  isAuth: false,
  isLoading: false,
};

export const useAuthStore = create<TAuthStore>()(
  devtools(
    (set, get) => ({
      ...initialState,

      init: async () => {
        set({ isLoading: true });

        try {
          const { user, isAuth } = await authApi.refreshToken();

          set({
            user,
            isAuth,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (payload: TSignUpPayload) => {
        set({ isLoading: true });

        try {
          const { user, isAuth } = await authApi.signUp(payload);

          set({
            user,
            isAuth,
            isLoading: false,
          });
        } finally {
          set({ isLoading: false });
        }

        return get().isAuth;
      },
    }),
    { name: "AuthStore" },
  ),
);
