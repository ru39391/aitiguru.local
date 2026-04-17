import { apiHandler } from "@/shared/api";
import { routes } from "@/shared/constants";
import { tokenHandler, type TResponseData } from "@/shared/api";
import type { TUserData } from "@/shared/types";
import type { TAuthApi, TAuthData, TSignInPayload, TSignUpPayload } from "../model/types";

export const authApi: TAuthApi = {
  handleUserData: async ({ data, success }: TResponseData<TUserData>) => {
    if(!success || !data) {
      return {
        isAuth: success,
        user: null
      };
    }

    const { id, email, fullname } = data;
    const { token } = await tokenHandler.setValue(data.token);
    const isAuth = Boolean(token);

    return {
      isAuth,
      user: isAuth ? { id, email, fullname } : null
    };
  },
  refreshToken: async function () {
    const response = await apiHandler.create<null, TUserData>(routes.api.refresh, null);

    return this.handleUserData(response);
  },
  signUp: async function (payload: TSignUpPayload) {
    const response = await apiHandler.create<TSignUpPayload, TUserData>(routes.api.signup, payload);

    return this.handleUserData(response);
  },
  signIn: async function (payload: TSignInPayload) {
    const response = await apiHandler.create<TSignInPayload, TUserData>(routes.api.login, payload);

    return this.handleUserData(response);
  },
  removeToken: async (payload: TAuthData) => {
    const { success } = await apiHandler.create<null, { success: boolean }>(routes.api.logout, null);

    if(!success) {
      return payload;
    }

    await tokenHandler.removeValue();

    return {
      isAuth: false,
      user: null
    };
  },
}
