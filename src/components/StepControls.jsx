import React from "react";
import { useSorting } from "../context/SortingContext";

function StepControls() {
  const { isPaused, setPaused, setNextStep } = useSorting();

  return (
    <div className="flex gap-2 mt-4 justify-center">
      <button
        onClick={() => setPaused((p) => !p)}
        className="px-4 py-2 bg-purple-600 text-white rounded"
      >
        {isPaused ? "Play" : "Pause"}
      </button>
      {isPaused && (
        <button
          onClick={() => setNextStep(true)}
          className="px-4 py-2 bg-yellow-500 text-white rounded"
        >
          Next Step
        </button>
      )}
    </div>
  );
}

export default StepControls;
