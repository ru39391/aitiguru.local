export const routes = {
  public: {
    login: "/sign-in",
    signup: "/sign-up",
  },
  protected: {
    home: "/positions",
    profile: "/profile",
  },
  api: {
    positions: "/positions",
    signup: "/auth/register",
    login: "/auth/login",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
} as const;

export const QUERY_KEY = "query";
