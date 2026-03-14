import { useEffect, type FC, type ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { routes } from "@/shared/constants";
import { useAuthStore } from "../model/store";

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  const { init, isAuth, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    init();
  }, [init]);

  return !isLoading && isAuth ? children : <Navigate to={routes.public.login} state={{ from: location }} replace />;
};

export default ProtectedRoute;
