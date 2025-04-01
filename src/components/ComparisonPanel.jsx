import React from 'react';

export default function ComparisonPanel({ comparisons, isOpen }) {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 ease-in-out">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Comparisons Log</h3>
      <div className="space-y-2">
        {comparisons.map((comparison, index) => (
          <div 
            key={index} 
            className="p-2 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-800 dark:text-gray-200"
          >
            <p>{comparison.numbers}</p>
            <p className="text-xs mt-1 text-gray-600 dark:text-gray-400">
              {comparison.result}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
} 