import { RESPONSE_DATA, type TResponseData } from "../model";

export const requestInterceptor = (config: RequestInit): RequestInit => {
  const token = null;

  return {
    ...config,
    headers: {
      ...config.headers,
      //...(token && { Authorization: `Bearer ${token}` }),
    },
  };
};

export const responseInterceptor = async <T>(
  response: Response
): Promise<TResponseData<T>> => {
  let res: TResponseData<T> = {
    ...RESPONSE_DATA,
    data: RESPONSE_DATA.data as T,
  };

  const result = await response.json();

  if (!response.ok) {
    const { error } = result;
    const message = error?.message as string || res.message;
    res = {
      ...res,
      data: error.errors ? [...Object.values(error.errors as Record<string, string[]>).map(item => item[0]), message] as T : [message] as T,
      message
    };

    return new Promise((reject) => reject(res));
  }

  res = {
    data: result.data !== undefined ? result.data : result,
    success: true,
    message: "",
  };

  return new Promise((resolve) => resolve(res));
};
