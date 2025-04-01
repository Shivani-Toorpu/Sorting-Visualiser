import { sleep } from "./bubbleSort";
import { playSwapSound } from "../utils/sound";

const BASE_DELAY = 300; // Base delay in milliseconds

async function partition(arr, low, high, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons) {
  const pivot = arr[high];
  let i = low - 1;

  setStateMap({ [high]: 'pivot' });
  setTooltip(`Pivot: ${pivot}`);
  await sleep(delay);

  for (let j = low; j < high; j++) {
    setStateMap({ [j]: 'comparing', [high]: 'pivot' });
    setTooltip(`Comparing ${arr[j]} with pivot ${pivot}`);
    stats.setComparisons((c) => c + 1);
    setComparisons(prev => [...prev, {
      numbers: `Comparing ${arr[j]} with pivot ${pivot}`,
      result: arr[j] <= pivot ? `${arr[j]} <= ${pivot} => Move i right` : `${arr[j]} > ${pivot} => Keep j`
    }]);

    await sleep(delay);

    if (arr[j] <= pivot) {
      i++;
      if (i !== j) {
        setStateMap({ [i]: 'swapping', [j]: 'swapping' });
        setTooltip(`Swapping ${arr[i]} with ${arr[j]}`);
        setComparisons(prev => [...prev, {
          numbers: `Swapping ${arr[i]} with ${arr[j]}`,
          result: `${arr[i]} > ${arr[j]} => Swap`
        }]);

        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        stats.setSwaps((s) => s + 1);
        playSwapSound();

        await sleep(delay);
      }
    }
  }

  if (i + 1 !== high) {
    setStateMap({ [i + 1]: 'swapping', [high]: 'swapping' });
    setTooltip(`Placing pivot in correct position`);
    setComparisons(prev => [...prev, {
      numbers: `Placing pivot ${pivot} at position ${i + 1}`,
      result: 'Final pivot position'
    }]);

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    setArray([...arr]);
    stats.setSwaps((s) => s + 1);
    playSwapSound();

    await sleep(delay);
  }

  setStateMap({ [i + 1]: 'sorted' });
  return i + 1;
}

async function quickSortHelper(arr, low, high, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons) {
  if (low < high) {
    const pi = await partition(arr, low, high, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);
    await quickSortHelper(arr, low, pi - 1, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);
    await quickSortHelper(arr, pi + 1, high, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);
  }
}

export async function quickSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons) {
  const arr = [...array];
  const n = arr.length;
  const delay = BASE_DELAY / speed;

  stats.startTimer();

  try {
    await quickSortHelper(arr, 0, n - 1, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);
    setStateMap(Object.fromEntries([...Array(n)].map((_, i) => [i, 'sorted'])));
    setTooltip('');
  } catch (error) {
    console.error('Quick Sort Error:', error);
    throw error;
  } finally {
    stats.stopTimer();
  }
}
