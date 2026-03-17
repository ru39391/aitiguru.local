import type { TUserData } from "@/shared/types";

export type TSignUpPayload = Record<"password", string> & Pick<"email" | "fullname", TUserData>;

export type TAuthData = {
  user: TUserData | null;
  isAuth: boolean;
}

export type TAuthState = TAuthData & {
  isLoading: boolean;
}

export type TAuthStore = TAuthState & {
  init: () => Promise<void>;
  register: (data: TSignUpPayload) => Promise<boolean>;
}

export type TAuthApi = {
  handleUserData: (data: TResponseData<TUserData>) => Promise<TAuthData>;
  refreshToken: () => Promise<TAuthData>;
  signUp: (data: TSignUpPayload) => Promise<TAuthData>;
}
