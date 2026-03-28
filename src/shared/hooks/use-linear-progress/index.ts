import { useRef, useState, useEffect, useCallback } from "react";
import { type TLinearProgressData } from "./model/types";

export const useLinearProgress = (options: TLinearProgressData) => {
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startHandleProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressValue = Math.min(100, Math.log10(elapsed + 1) * 35);

      setProgress(Math.round(progressValue));
    }, 100);
  };

  const stopHandleProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    if(options.isLoading) {
      startHandleProgress();
    } else {
      stopHandleProgress();
    }

    return () => {
      stopHandleProgress();
    };
  }, [options.isLoading]);

  const startProgress = useCallback(() => {
    stopHandleProgress();
    setProgress(0);

    if (options.isLoading) {
      startHandleProgress();
    }
  }, [options.isLoading]);

  const completeProgress = useCallback(() => {
    stopHandleProgress();
    setProgress(100);

    if (options.onComplete) options.onComplete();
  }, [options]);

  const resetProgress = () => {
    stopHandleProgress();
    setProgress(0);
  };

  return {
    progress,
    isPending: progress !== 100,
    startProgress,
    completeProgress,
    resetProgress
  };
};
