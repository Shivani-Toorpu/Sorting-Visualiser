import React from "react";

const stateColors = {
  comparing: "bg-blue-500",
  swapping: "bg-red-500",
  sorted: "bg-green-500",
};

function SortingBar({ array, stateMap }) {
  return (
    <div className="flex justify-center items-end space-x-2 h-64 bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
      {array.map((value, index) => {
        const barHeight = (value / Math.max(...array)) * 100;
        const state = stateMap[index];
        const barColor = stateColors[state] || "bg-gray-400";

        return (
          <div key={index} className="flex flex-col items-center text-xs">
            <div 
              className={`w-6 transition-all duration-300 ease-in-out rounded-t ${barColor}`} 
              style={{ height: `${barHeight}%` }}
            />
            <span className="mt-1">{value}</span>
          </div>
        );
      })}
    </div>
  );
}

export default SortingBar;
