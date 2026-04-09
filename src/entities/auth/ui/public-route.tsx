import { useEffect, useState, type FC, type ReactNode } from "react";
import { LinearProgress } from "@/shared/ui";
import { Navigate, useLocation } from "react-router";
import { routes } from "@/shared/constants";
import { useAuthStore } from "../model/store";
import { useLinearProgress } from "@/shared/hooks";

const PublicRoute: FC<{ children: ReactNode }> = ({ children }) => {
  const [isInit, setInit] = useState<boolean>(false);
  const { init, isAuth, isLoading } = useAuthStore();
  const { isPending, progress } = useLinearProgress({ isLoading });
  const location = useLocation();

  useEffect(() => {
    const initialize = async () => {
      if (isInit) return;

      try {
        await init();
      } finally {
        setInit(true);
      }
    };

    initialize();
  }, [init]);

  if (isAuth) {
    return <Navigate to={routes.protected.home} state={{ from: location }} replace />;
  }

  return (
    <>
      {(isPending || !isInit) && <LinearProgress {...{ progress }} />}
      <div className={isLoading && !isAuth ? "hidden" : ""}>{children}</div>
      {/* <Loader isVisible={isLoading} hasCircle={!isLoading}>{children}</Loader> */}
    </>
  )
};

export default PublicRoute;
