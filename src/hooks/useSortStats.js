import { useState } from "react";

export function useSortStats() {
  const [comparisons, setComparisons] = useState(0);
  const [swaps, setSwaps] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const startTimer = () => setStartTime(Date.now());
  const stopTimer = () => setEndTime(Date.now());

  return {
    comparisons, swaps,
    setComparisons, setSwaps,
    startTime, endTime,
    startTimer, stopTimer,
    totalTime: endTime && startTime ? endTime - startTime : null
  };
}
