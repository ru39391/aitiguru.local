import { apiHandler } from "@/shared/api";
import { StorageHandler } from "@/shared/utils";
import { routes } from "@/shared/constants";
import { QUERY_KEY } from "@/shared/constants";
import type { TPositionApi, TQueryData } from "../model/types";
import type { TPaginationData, TPositionData, TPositionPayload } from "@/shared/types";

export const positionApi: TPositionApi = {
  fetchItems: async (payload = null) => {
    const storageData = StorageHandler.getData<TQueryData>(QUERY_KEY);
    const query = payload && storageData ? {...payload, ...storageData} : (payload || storageData);
    const url = `${routes.api.positions}${query
      ? Object.entries(query).reduce(
        (acc, [key, value], index) => {
          const str = `${index !== 0 ? "&" : ""}${key}=${value}`;

          return `${acc}${str}`;
        }
        , "?"
      )
      : ""
    }`;
    const { data: { data, ...pagination } } = await apiHandler.fetch<TPaginationData & { data: TPositionData[]; }>(url);

    return Array.isArray(data) ? { data, pagination } : { data: [], pagination: null };
  },
  addItem: async ({ item, arr, pagination }) => {
    const { data } = await apiHandler.create<Omit<TPositionPayload, "price"> & { price: number }, TPositionData>(routes.api.positions, item);
    const { success, ...position } = data as TPositionData & { success: boolean };

    return {
      data: success ? [position, ...arr] : arr,
      pagination: pagination
        ? {
          ...pagination,
          perPage: success ? pagination.perPage + 1 : pagination.perPage,
          totalCount: success ? pagination.totalCount + 1 : pagination.totalCount
        }
        : pagination,
      success
    };
  },
  updateItem: async ({ item, arr }) => {
    const { data } = await apiHandler.update<TPositionData, TPositionData>(`${routes.api.positions}/${item.id}`, item);
    const { success, ...position } = data as TPositionData & { success: boolean };

    return {
      data: success ? [...arr].map(data => data.id === position.id ? position : data) : arr,
      success
    };
  },
  removeItem: async ({ id, arr, pagination }) => {
    const { success } = await apiHandler.remove<null, { success: boolean; }>(`${routes.api.positions}/${id}`);

    return {
      data: success ? [...arr].filter(item => Number(item.id) !== Number(id)) : arr,
      pagination: pagination
      ? {
          ...pagination,
          perPage: success ? pagination.perPage - 1 : pagination.perPage,
          totalCount: success ? pagination.totalCount - 1 : pagination.totalCount
        }
      : pagination,
      success
    };
  },
}
