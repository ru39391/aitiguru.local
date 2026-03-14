import { apiHandler } from "@/shared/api";
import { routes } from "@/shared/constants";
import type { TAuthApi } from "../model/types";

export const authApi: TAuthApi = {
  refreshToken: async () => {
    const data = await apiHandler.create<null>(routes.api.refresh);

    return { user: null, isAuth: false };
  },

  /*
  fetchItems: async (payload = null) => {
    const url = `${routes.api.positions}${payload
      ? Object.entries(payload).reduce(
        (acc, [key, value], index) => {
          const str = `${index !== 0 ? "&" : ""}${key}=${value}`;

          return `${acc}${str}`;
        }
        , "?"
      )
      : ""
    }`;
    const { data: { data, ...pagination } } = await apiHandler.fetch<TPositionData[]>(url);

    return { data, pagination };
  }
*/
}
