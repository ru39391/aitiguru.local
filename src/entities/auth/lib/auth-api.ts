import { apiHandler } from "@/shared/api";
import { routes } from "@/shared/constants";
import { tokenHandler, type TResponseData } from "@/shared/api";
import type { TUserData } from "@/shared/types";
import type { TAuthApi, TAuthData, TSignInPayload, TSignUpPayload } from "../model/types";

export const authApi: TAuthApi = {
  handleUserData: async ({ data, success }: TResponseData<TUserData>) => {
    if(!success) {
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
    const { data, success } = await apiHandler.create<null, TResponseData<TUserData>>(routes.api.refresh);

    return this.handleUserData({ data, success });
  },
  signUp: async function (payload: TSignUpPayload) {
    const { data, success } = await apiHandler.create<TSignUpPayload, TResponseData<TUserData>>(routes.api.signup, payload);

    return this.handleUserData({ data, success });
  },
  signIn: async function (payload: TSignInPayload) {
    const { data, success } = await apiHandler.create<TSignInPayload, TResponseData<TUserData>>(routes.api.login, payload);

    return this.handleUserData({ data, success });
  },
  removeToken: async (payload: TAuthData) => {
    const { success } = await apiHandler.create<null, Pick<"success", TResponseData<null>>>(routes.api.logout);

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
