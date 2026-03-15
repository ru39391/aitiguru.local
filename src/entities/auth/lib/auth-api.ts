import { apiHandler } from "@/shared/api";
import { routes } from "@/shared/constants";
import type { TResponseData } from "@/shared/api";
import type { TUserData } from "@/shared/types";
import type { TAuthApi, TSignUpPayload } from "../model/types";

export const authApi: TAuthApi = {
  refreshToken: async () => {
    const data = await apiHandler.create<null, {}>(routes.api.refresh);

    console.log('refreshToken: ', data);
    return { user: null, isAuth: false };
  },

  signUp: async (payload: TSignUpPayload) => {
    const { data, success } = await apiHandler.create<TSignUpPayload, TResponseData<TUserData>>(routes.api.signup, payload);

    if(!success) {
      return {
        isAuth: success,
        user: null
      };
    }

    const { id, email, fullname, token } = data;

    return {
      isAuth: Boolean(token),
      user: { id, email, fullname }
    };
  }
}
