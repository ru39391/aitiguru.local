import { API_URL } from "../model";

const createAPIClient = (params: RequestInit & { baseURL?: string } = {}) => {
  const { baseURL, ...defaultConfig } = params;

  return async (url: string, config: RequestInit = {}) => {
    const apiUrl = baseURL ? `${baseURL}${url}` : url;

    const customConfig: RequestInit = {
      ...defaultConfig,
      ...config,
      headers: {
        "Content-Type": "application/json",
        ...defaultConfig.headers,
        ...config.headers,
      },
      credentials: "include",
    };

    return await fetch(apiUrl, customConfig);
  };
};

export const apiClient = createAPIClient({
  baseURL: API_URL,
});
