import { sleep } from "./bubbleSort";
import { playSwapSound } from "../utils/sound";

const BASE_DELAY = 300; // Base delay in milliseconds

async function merge(arr, left, mid, right, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons) {
  const n1 = mid - left + 1;
  const n2 = right - mid;
  const L = arr.slice(left, mid + 1);
  const R = arr.slice(mid + 1, right + 1);
  let i = 0, j = 0, k = left;

  setTooltip(`Merging subarrays [${left}-${mid}] and [${mid + 1}-${right}]`);
  await sleep(delay);

  while (i < n1 && j < n2) {
    setStateMap({ [left + i]: 'comparing', [mid + 1 + j]: 'comparing' });
    setTooltip(`Comparing ${L[i]} with ${R[j]}`);
    stats.setComparisons((c) => c + 1);
    setComparisons(prev => [...prev, {
      numbers: `Comparing ${L[i]} with ${R[j]}`,
      result: L[i] <= R[j] ? `${L[i]} <= ${R[j]} => Take from left` : `${L[i]} > ${R[j]} => Take from right`
    }]);

    await sleep(delay);

    if (L[i] <= R[j]) {
      arr[k] = L[i];
      setStateMap({ [k]: 'swapping' });
      setTooltip(`Placing ${L[i]} from left subarray`);
      i++;
    } else {
      arr[k] = R[j];
      setStateMap({ [k]: 'swapping' });
      setTooltip(`Placing ${R[j]} from right subarray`);
      j++;
    }
    setArray([...arr]);
    stats.setSwaps((s) => s + 1);
    k++;
  }

  while (i < n1) {
    arr[k] = L[i];
    setStateMap({ [k]: 'swapping' });
    setTooltip(`Placing remaining ${L[i]} from left subarray`);
    setArray([...arr]);
    stats.setSwaps((s) => s + 1);
    i++;
    k++;
    await sleep(delay);
  }

  while (j < n2) {
    arr[k] = R[j];
    setStateMap({ [k]: 'swapping' });
    setTooltip(`Placing remaining ${R[j]} from right subarray`);
    setArray([...arr]);
    stats.setSwaps((s) => s + 1);
    j++;
    k++;
    await sleep(delay);
  }

  // Mark merged section as sorted
  for (let i = left; i <= right; i++) {
    setStateMap({ [i]: 'sorted' });
  }
}

async function mergeSortHelper(arr, left, right, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons) {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);
    
    setTooltip(`Dividing array at index ${mid}`);
    await sleep(delay);

    await mergeSortHelper(arr, left, mid, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);
    await mergeSortHelper(arr, mid + 1, right, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);

    await merge(arr, left, mid, right, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);
  }
}

export async function mergeSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons) {
  const arr = [...array];
  const n = arr.length;
  const delay = BASE_DELAY / speed;

  stats.startTimer();

  try {
    await mergeSortHelper(arr, 0, n - 1, setArray, setStateMap, setTooltip, delay, waitForStep, stats, setComparisons);
    setStateMap(Object.fromEntries([...Array(n)].map((_, i) => [i, 'sorted'])));
    setTooltip('');
  } catch (error) {
    console.error('Merge Sort Error:', error);
    throw error;
  } finally {
    stats.stopTimer();
  }
}
