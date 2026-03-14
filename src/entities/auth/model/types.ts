import type { TUserData } from "@/shared/types";

export type TUserPayload = Record<"password", string> & Pick<"email" | "fullname", TUserData>;

export type TAuthState = {
  user: TUserData | null;
  isAuth: boolean;
  isLoading: boolean;
}

export type TAuthStore = TAuthState & {
  init: () => Promise<void>;
  register: (data: TUserPayload) => Promise<void>;
}

export type TAuthApi = {
  refreshToken: () => Promise<Omit<TAuthState, "isLoading">>;
}
