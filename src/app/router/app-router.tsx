import type { FC } from "react";
import { Navigate, Route, Routes } from "react-router";
import {
  Error404,
  Positions,
  SignIn,
  SignUp,
} from "@/pages";

import { ProtectedRoute, PublicRoute } from "@/entities/auth";
import { routes } from "@/shared/constants";

const AppRouter: FC = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={routes.protected.home} replace />}
      />
      {[
        {
          path: routes.public.login,
          element: <PublicRoute><SignIn /></PublicRoute>,
        },
        {
          path: routes.public.signup,
          element: <PublicRoute><SignUp /></PublicRoute>,
        },
        {
          path: routes.protected.home,
          element: <ProtectedRoute><Positions /></ProtectedRoute>,
        },
        {
          path: "*",
          element: <Error404 />,
        },
      ].map((props, index) => (
        <Route key={index.toString()} {...props} />
      ))}
    </Routes>
  );
};

export default AppRouter;
