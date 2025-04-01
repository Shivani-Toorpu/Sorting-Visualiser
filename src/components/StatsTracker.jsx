import React from "react";

function StatsTracker({ comparisons, swaps, totalTime }) {
  return (
    <div className="text-center mt-6">
      <p>🔁 Comparisons: <strong>{comparisons}</strong></p>
      <p>🔄 Swaps: <strong>{swaps}</strong></p>
      {totalTime && <p>⏱ Time: <strong>{totalTime}ms</strong></p>}
    </div>
  );
}

export default StatsTracker;
