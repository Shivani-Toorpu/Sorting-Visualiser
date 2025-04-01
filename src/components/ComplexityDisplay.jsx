import React from 'react';

const complexityMap = {
  'Bubble': {
    time: 'O(n²)',
    space: 'O(1)',
    description: 'Bubble Sort has a quadratic time complexity, making it inefficient for large datasets.'
  },
  'Selection': {
    time: 'O(n²)',
    space: 'O(1)',
    description: 'Selection Sort maintains quadratic time complexity regardless of input.'
  },
  'Insertion': {
    time: 'O(n²)',
    space: 'O(1)',
    description: 'Insertion Sort performs well on nearly sorted arrays but has quadratic worst case.'
  },
  'Merge': {
    time: 'O(n log n)',
    space: 'O(n)',
    description: 'Merge Sort guarantees O(n log n) time complexity but requires extra space.'
  },
  'Quick': {
    time: 'O(n log n)',
    space: 'O(log n)',
    description: 'Quick Sort has good average case but O(n²) worst case complexity.'
  }
};

export default function ComplexityDisplay({ algorithm, executionTime }) {
  if (!algorithm || !complexityMap[algorithm]) return null;

  const complexity = complexityMap[algorithm];

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
        Algorithm Analysis: {algorithm} Sort
      </h3>
      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
        <p>Time Complexity: <span className="font-mono">{complexity.time}</span></p>
        <p>Space Complexity: <span className="font-mono">{complexity.space}</span></p>
        <p>Execution Time: {executionTime}ms</p>
        <p className="text-xs italic">{complexity.description}</p>
      </div>
    </div>
  );
} 