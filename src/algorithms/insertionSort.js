import { sleep } from "./bubbleSort";
import { playSwapSound } from "../utils/sound";

const BASE_DELAY = 300; // Base delay in milliseconds

export async function insertionSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons) {
  const arr = [...array];
  const n = arr.length;
  const delay = BASE_DELAY / speed;

  stats.startTimer();

  try {
    for (let i = 1; i < n; i++) {
      const key = arr[i];
      let j = i - 1;

      setStateMap({ [i]: 'comparing' });
      setTooltip(`Current element: ${key}`);
      await sleep(delay);

      while (j >= 0 && arr[j] > key) {
        setStateMap({ [j]: 'comparing', [j + 1]: 'comparing' });
        setTooltip(`Comparing ${arr[j]} with ${key}`);
        stats.setComparisons((c) => c + 1);
        setComparisons(prev => [...prev, {
          numbers: `Comparing ${arr[j]} with ${key}`,
          result: `${arr[j]} > ${key} => Shift ${arr[j]} right`
        }]);

        await sleep(delay);

        arr[j + 1] = arr[j];
        setArray([...arr]);
        stats.setSwaps((s) => s + 1);

        setStateMap({ [j]: 'swapping', [j + 1]: 'swapping' });
        await sleep(delay);

        j--;
      }

      arr[j + 1] = key;
      setArray([...arr]);
      setStateMap({ [j + 1]: 'sorted' });
      setComparisons(prev => [...prev, {
        numbers: `Inserting ${key} at position ${j + 1}`,
        result: 'Found correct position'
      }]);

      await sleep(delay);
    }

    // Mark all elements as sorted
    setStateMap(Object.fromEntries([...Array(n)].map((_, i) => [i, 'sorted'])));
    setTooltip('');
  } catch (error) {
    console.error('Insertion Sort Error:', error);
    throw error;
  } finally {
    stats.stopTimer();
  }
}
