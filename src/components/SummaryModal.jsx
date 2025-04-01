import React from "react";

function SummaryModal({ visible, onClose, stats }) {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg text-center">
        <h2 className="text-xl font-bold mb-4">Sorting Summary</h2>
        <p>🔁 Comparisons: {stats.comparisons}</p>
        <p>🔄 Swaps: {stats.swaps}</p>
        <p>⏱ Time Taken: {stats.totalTime} ms</p>
        <p>🧠 Time Complexity: O(n²)</p>
        <p>🧠 Space Complexity: O(1)</p>
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
          Close
        </button>
      </div>
    </div>
  );
}

export default SummaryModal;
