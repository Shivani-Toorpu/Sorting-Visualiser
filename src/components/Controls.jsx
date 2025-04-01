import React, { useState } from 'react';
import { bubbleSort } from '../algorithms/bubbleSort';
import { selectionSort } from '../algorithms/selectionSort';
import { insertionSort } from '../algorithms/insertionSort';
import { mergeSort } from '../algorithms/mergeSort';
import { quickSort } from '../algorithms/quickSort';

const SPEEDS = [
  { label: '0.25x', value: 4 },
  { label: '0.5x', value: 2 },
  { label: '0.75x', value: 1.5 },
  { label: 'Normal', value: 1 },
  { label: '1.25x', value: 0.8 },
  { label: '1.5x', value: 0.67 },
  { label: '1.75x', value: 0.57 },
  { label: '2x', value: 0.5 },
];

export default function Controls({ 
  array, 
  setArray, 
  setStateMap, 
  setTooltip, 
  speed,
  setSpeed,
  waitForStep, 
  stats,
  setCurrentAlgorithm,
  setComparisons,
  isStepMode,
  setIsStepMode,
  isPanelOpen,
  setIsPanelOpen
}) {
  const [arraySize, setArraySize] = useState('');
  const [arrayElements, setArrayElements] = useState('');
  const [error, setError] = useState('');

  const handleArrayInput = (e) => {
    e.preventDefault();
    const elements = arrayElements.trim().split(/\s+/).map(Number);
    
    if (elements.length !== parseInt(arraySize)) {
      setError(`Please enter exactly ${arraySize} numbers`);
      return;
    }
    
    if (elements.some(isNaN)) {
      setError('Please enter valid numbers only');
      return;
    }

    setError('');
    resetState(elements);
  };

  const resetState = (newArray = []) => {
    setArray(newArray);
    setStateMap({});
    setCurrentAlgorithm(null);
    setComparisons([]);
    setTooltip('');
    stats.comparisons = 0;
    stats.swaps = 0;
    stats.time = 0;
  };

  const onSort = async (algorithm) => {
    if (!array.length) return;
    setError('');
    setCurrentAlgorithm(algorithm);
    
    try {
      switch (algorithm) {
        case 'Bubble':
          await bubbleSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons);
          break;
        case 'Selection':
          await selectionSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons);
          break;
        case 'Insertion':
          await insertionSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons);
          break;
        case 'Merge':
          await mergeSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons);
          break;
        case 'Quick':
          await quickSort(array, setArray, setStateMap, setTooltip, speed, waitForStep, stats, setComparisons);
          break;
        default:
          console.error('Algorithm not implemented:', algorithm);
          setCurrentAlgorithm(null);
      }
    } catch (error) {
      console.error('Sorting error:', error);
      setError('An error occurred during sorting');
      setCurrentAlgorithm(null);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow space-y-4">
      <form onSubmit={handleArrayInput} className="space-y-3">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter array size:
          </label>
          <input
            type="number"
            min="1"
            value={arraySize}
            onChange={(e) => setArraySize(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Enter array elements (space-separated):
          </label>
          <input
            type="text"
            value={arrayElements}
            onChange={(e) => setArrayElements(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div className="flex space-x-2">
          <button
            type="submit"
            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate Array
          </button>
          <button
            type="button"
            onClick={() => resetState([])}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            Reset
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <div className="space-y-4">
        <div className="flex space-x-2 flex-wrap">
          {["Bubble", "Selection", "Insertion", "Merge", "Quick"].map((algo) => (
            <button
              key={algo}
              onClick={() => onSort(algo)}
              type="button"
              className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
            >
              {algo} Sort
            </button>
          ))}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => setIsStepMode(!isStepMode)}
            className={`px-3 py-1 rounded ${
              isStepMode 
                ? 'bg-purple-600 text-white hover:bg-purple-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Step-wise
          </button>
          <button
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={`px-3 py-1 rounded ${
              isPanelOpen 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Comparisons
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Speed Control
          </label>
          <div className="space-y-2">
            {SPEEDS.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setSpeed(value)}
                className={`w-full text-left px-3 py-1 rounded ${
                  speed === value
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}