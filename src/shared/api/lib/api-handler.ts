import { apiClient, requestInterceptor, responseInterceptor } from "../lib";
import { RESPONSE_DATA, type TResponseData } from "../model";
import { useNotificationStore } from "@/shared/store/notification";

const notificationState = useNotificationStore.getState();

const handleApiClient = async <P, R>(
  params: { method?: "GET" | "POST" | "PUT" | "DELETE"; url: string },
  payload: P | null = null,
): Promise<TResponseData<R>> => {
  let res: TResponseData<R> = {
    ...RESPONSE_DATA,
    data: RESPONSE_DATA.data as R,
  };

  const config: RequestInit = requestInterceptor({
    method: params.method || "POST",
    ...(payload && { body: JSON.stringify(payload) }),
  });

  try {
    const response = await apiClient(params.url, config);

    const { data, success, message }: TResponseData<R> =
      await responseInterceptor(response);

    if (success !== undefined && !success) {
      throw new Error(message || res.message);
    }

    res = { data, success, message };
  } catch (error) {
    const errorData = error as { message?: string };

    notificationState.add({
      title: errorData.message || RESPONSE_DATA.message,
      type: "error"
    });
  }

  return res;
};

export const apiHandler = {
  fetch: async <T>(url: string) =>
    handleApiClient<null, T>({ url, method: "GET" }),
  create: async <P, T>(url: string, payload: P) =>
    handleApiClient<P, T>({ url, method: "POST" }, payload),
  update: async <P, T>(url: string, payload: P) =>
    handleApiClient<P, T>({ url, method: "PUT" }, payload),
  remove: async <P, T>(url: string, payload?: P) =>
    handleApiClient<P, T>({ url, method: "DELETE" }, payload),
};
