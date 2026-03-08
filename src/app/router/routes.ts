const routes = {
  public: {
    login: "/sign-in",
    signup: "/sign-up",
  },
  protected: {
    home: "/positions",
  },
} as const;

export default routes;
