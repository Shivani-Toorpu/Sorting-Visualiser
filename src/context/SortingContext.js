import { createContext, useContext, useState, useCallback } from "react";

const SortingContext = createContext();

export const useSorting = () => useContext(SortingContext);

export function SortingProvider({ children }) {
  const [isPaused, setPaused] = useState(false);
  const [nextStep, setNextStep] = useState(false);

  const waitForStep = useCallback(async () => {
    return new Promise((resolve) => {
      if (!isPaused) return resolve();
      const interval = setInterval(() => {
        if (nextStep) {
          clearInterval(interval);
          setNextStep(false);
          resolve();
        }
      }, 100);

      // Cleanup function
      return () => clearInterval(interval);
    });
  }, [isPaused, nextStep]);

  return (
    <SortingContext.Provider value={{ isPaused, setPaused, nextStep, setNextStep, waitForStep }}>
      {children}
    </SortingContext.Provider>
  );
}
