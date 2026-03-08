import { useEffect } from "react";
import type { FC, ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
//import { LoadingDataSection } from "@/shared/ui/custom/loader";
//import { useAuthStore } from "../model/store";

interface IProtectedRoute {
  children: ReactNode;
}

const ProtectedRoute: FC<IProtectedRoute> = ({ children }) => {
  return children;
  /*
  const { init, isAuth, isLoading } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    init();
  }, [init]);

  return (
    <LoadingDataSection {...{ isLoading, isFullScreen: isLoading }}>
      {!isLoading && isAuth ? (
        children
      ) : (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
    </LoadingDataSection>
  );
  */
};

export default ProtectedRoute;
