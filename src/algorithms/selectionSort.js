import { sleep } from "./bubbleSort";
import { playSwapSound } from "../utils/sound";

const BASE_DELAY = 300; // Base delay in milliseconds

export async function selectionSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons) {
  const arr = [...array];
  const n = arr.length;
  const delay = BASE_DELAY / speed;

  stats.startTimer();

  try {
    for (let i = 0; i < n - 1; i++) {
      let minIdx = i;

      for (let j = i + 1; j < n; j++) {
        setStateMap({ [minIdx]: 'comparing', [j]: 'comparing' });
        setTooltip(`Comparing ${arr[j]} with current minimum ${arr[minIdx]}`);
        stats.setComparisons((c) => c + 1);
        setComparisons(prev => [...prev, {
          numbers: `Comparing ${arr[j]} with current minimum ${arr[minIdx]}`,
          result: arr[j] < arr[minIdx] ? `${arr[j]} < ${arr[minIdx]} => Update minimum` : `${arr[j]} >= ${arr[minIdx]} => Keep current minimum`
        }]);
        
        await sleep(delay);

        if (arr[j] < arr[minIdx]) {
          minIdx = j;
        }
      }

      if (minIdx !== i) {
        setStateMap({ [i]: 'swapping', [minIdx]: 'swapping' });
        setTooltip(`Swapping ${arr[i]} with ${arr[minIdx]}`);
        setComparisons(prev => [...prev, {
          numbers: `Swapping ${arr[i]} with ${arr[minIdx]}`,
          result: `${arr[i]} > ${arr[minIdx]} => Swap`
        }]);
        
        [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        setArray([...arr]);
        stats.setSwaps((s) => s + 1);
        
        await sleep(delay);
      }

      // Keep track of sorted elements
      const sortedState = {};
      for (let k = 0; k <= i; k++) {
        sortedState[k] = 'sorted';
      }
      setStateMap(sortedState);
    }

    // Mark all elements as sorted at the end
    const finalState = {};
    for (let i = 0; i < n; i++) {
      finalState[i] = 'sorted';
    }
    setStateMap(finalState);
    setTooltip('');
  } catch (error) {
    console.error('Selection Sort Error:', error);
    throw error;
  } finally {
    stats.stopTimer();
  }
}
