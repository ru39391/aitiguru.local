import type { TResponseData } from "@/shared/api";
import type { TUserData } from "@/shared/types";

export type TSignUpFormData = Record<"password" | "confirm_password", string> & Pick<TUserData, "email" | "fullname"> & { term?: string; };

export type TSignUpPayload = Omit<TSignUpFormData, "term"> & { term: number };

export type TSignInFormData = Pick<TSignUpFormData, "email" | "password" | "term">;

export type TSignInPayload = Pick<TSignUpPayload, "email" | "password" | "term">;

export type TAuthData = {
  user: Omit<TUserData, "token"> | null;
  isAuth: boolean;
}

export type TAuthState = TAuthData & {
  isLoading: boolean;
}

export type TAuthStore = TAuthState & {
  init: () => Promise<boolean>;
  register: (data: TSignUpPayload) => Promise<boolean>;
  login: (data: TSignInPayload) => Promise<boolean>;
  logout: () => Promise<void>;
}

export type TAuthApi = {
  handleUserData: (data: TResponseData<TUserData>) => Promise<TAuthData>;
  refreshToken: () => Promise<TAuthData>;
  signUp: (data: TSignUpPayload) => Promise<TAuthData>;
  signIn: (data: TSignInPayload) => Promise<TAuthData>;
  removeToken: (payload: TAuthData) => Promise<TAuthData>;
}
