import type { TUserData } from "@/shared/types";

export type TSignUpPayload = Record<"password", string> & Pick<"email" | "fullname", TUserData>;

export type TAuthState = {
  user: TUserData | null;
  isAuth: boolean;
  isLoading: boolean;
}

export type TAuthStore = TAuthState & {
  init: () => Promise<void>;
  register: (data: TSignUpPayload) => Promise<boolean>;
}

export type TAuthApi = {
  refreshToken: () => Promise<Omit<TAuthState, "isLoading">>;
  signUp: (data: TSignUpPayload) => Promise<Omit<TAuthState, "isLoading">>;
}
