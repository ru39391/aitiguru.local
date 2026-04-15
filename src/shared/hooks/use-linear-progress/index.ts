import { useRef, useState, useEffect, useCallback } from "react";
import { type TLinearProgressData } from "./model/types";

export const useLinearProgress = (options: TLinearProgressData) => {
  const [progress, setProgress] = useState<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopHandleProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  const handleProgress = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const startTime = Date.now();

    intervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progressValue = Math.min(100, Math.log10(elapsed + 1) * (options.isLoading ? 15 : 35));

      setProgress(Math.round(progressValue));

      if(progressValue >= 100) stopHandleProgress();
    }, 100);
  };

  useEffect(() => {
    handleProgress();
  }, [options.isLoading]);

  const startProgress = () => {
    setProgress(0);
  };

  const completeProgress = useCallback(() => {
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
