import { apiClient, requestInterceptor, responseInterceptor } from "../lib";
import { RESPONSE_DATA, type TResponseData } from "../model";

const handleResponseError = ({
  data,
  message,
}: {
  data: string[];
  message: string;
}) => {
  console.log('handleResponseError: ', { data, message });
};

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

  const response = await apiClient(params.url, config);

  const { data, success, message }: TResponseData<R> =
    await responseInterceptor(response);

  if (success !== undefined && !success) {
    handleResponseError({ data: data as string[], message: String(message) });
    throw new Error(message || res.message);
  }

  res = { data, success, message };
  console.log('handleApiClient: ', { data, success, message });

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
