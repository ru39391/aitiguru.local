export const routes = {
  public: {
    login: "/sign-in",
    signup: "/sign-up",
  },
  protected: {
    home: "/positions",
  },
  api: {
    positions: "/positions",
  },
} as const;
