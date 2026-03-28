import { useEffect, useState, type FC, type ReactNode } from "react";
import { LinearProgress } from "@/shared/ui";
import { Navigate, useLocation } from "react-router";
import { routes } from "@/shared/constants";
import { useAuthStore } from "../model/store";
import { useLinearProgress } from "@/shared/hooks";

const ProtectedRoute: FC<{ children: ReactNode; }> = ({ children }) => {
  const [isInit, setInit] = useState<boolean>(false);
  const { init, isAuth, isLoading } = useAuthStore();
  const { isPending, progress, startProgress, completeProgress } = useLinearProgress({ isLoading });
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      startProgress();

      await init();
      completeProgress();
      setInit(true);
    };

    initialize();
  }, [init]);

  if (isPending || !isInit) {
    return <LinearProgress {...{ progress }} />;
  }

  return !isLoading && isAuth ? children : <Navigate to={routes.public.login} state={{ from: location }} replace />;
  // return !isLoading && isAuth ? <Navigate to={routes.public.home} state={{ from: location }} replace /> : children;
}

export default ProtectedRoute;
