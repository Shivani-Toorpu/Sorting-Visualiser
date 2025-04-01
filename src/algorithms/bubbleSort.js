import { playSwapSound } from "../utils/sound";

export const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

const BASE_DELAY = 300; // Base delay in milliseconds

export async function bubbleSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons) {
  if (!Array.isArray(array) || array.length === 0) {
    throw new Error("Invalid input array");
  }

  const arr = [...array];
  const n = arr.length;
  const delay = BASE_DELAY / speed; // Divide by speed to make higher speed = faster

  stats.startTimer();

  try {
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setStateMap({ [j]: "comparing", [j + 1]: "comparing" });
        const isSwapping = arr[j] > arr[j + 1];
        setTooltip(`${arr[j]} > ${arr[j + 1]} ${isSwapping ? "— Swapping" : ""}`);
        setComparisons(prev => [...prev, {
          numbers: `${arr[j]} ${arr[j] >= arr[j + 1] ? '>=' : '<'} ${arr[j + 1]}`,
          result: isSwapping ? "Swap needed" : "No swap needed"
        }]);
        await sleep(delay);

        if (isSwapping) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
          setStateMap({ [j]: "swapping", [j + 1]: "swapping" });
          playSwapSound();
          stats.setSwaps((s) => s + 1);
          await sleep(delay);
        }

        // Keep track of sorted elements
        const sortedState = {};
        for (let k = n - i; k < n; k++) {
          sortedState[k] = "sorted";
        }
        setStateMap(sortedState);
      }
    }

    // At the end of sorting, mark ALL elements as sorted
    const finalState = {};
    for (let i = 0; i < n; i++) {
      finalState[i] = "sorted";
    }
    setStateMap(finalState);
    setTooltip("Array is sorted!");
  } catch (error) {
    console.error("Error in bubbleSort:", error);
    throw error;
  } finally {
    stats.stopTimer();
  }
}
