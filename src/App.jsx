import React, { useState } from "react";
import SortingBar from "./components/SortingBar";
import Controls from "./components/Controls";
import Tooltip from "./components/Tooltip";
import StepControls from "./components/StepControls";
import ThemeToggle from "./components/Themetoggle";
import StatsTracker from "./components/StatsTracker";
import SummaryModal from "./components/SummaryModal";
import ChartDisplay from "./components/ChartDisplay";

import { bubbleSort } from "./algorithms/bubbleSort";
import { selectionSort } from "./algorithms/selectionSort";
import { insertionSort } from "./algorithms/insertionSort";
import { mergeSort } from "./algorithms/mergeSort";
import { quickSort } from "./algorithms/quickSort";

import { useSorting } from "./context/SortingContext";
import { useSortStats } from "./hooks/useSortStats";

function App() {
  const [array, setArray] = useState([]); // ✅ safe initial value
  const [stateMap, setStateMap] = useState({});
  const [tooltip, setTooltip] = useState("");
  const [speed, setSpeed] = useState("medium");
  const [history, setHistory] = useState([]); // ✅ safe initial value
  const [showModal, setShowModal] = useState(false);

  const stats = useSortStats();
  const { waitForStep } = useSorting();

  const handleArrayInput = (input) => {
    const arr = input
      .split(/[\s,]+/)
      .map(Number)
      .filter((n) => !isNaN(n));
    setArray(arr);
    setStateMap({});
    setTooltip("");
  };

  const handleSort = async (type) => {
    const sharedProps = [array, setArray, setStateMap, setTooltip, speed, waitForStep, stats];

    if (type === "Bubble") await bubbleSort(...sharedProps);
    else if (type === "Selection") await selectionSort(...sharedProps);
    else if (type === "Insertion") await insertionSort(...sharedProps);
    else if (type === "Merge") await mergeSort(...sharedProps);
    else if (type === "Quick") await quickSort(...sharedProps);

    setHistory((prev) => [
      ...prev,
      {
        size: array.length,
        comparisons: stats.comparisons,
        swaps: stats.swaps,
      },
    ]);
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6">
      <ThemeToggle />
      <h1 className="text-3xl font-bold mb-6 text-center">Sorting Visualizer</h1>

      <Controls
        onArrayInput={handleArrayInput}
        onSort={handleSort}
        speed={speed}
        setSpeed={setSpeed}
      />

      {tooltip && <Tooltip message={tooltip} />}

      <div className="flex items-end justify-center space-x-2 h-96 mt-10">
        {Array.isArray(array) &&
          array.map((value, idx) => (
            <SortingBar key={idx} value={value} state={stateMap[idx]} />
          ))}
      </div>

      <StepControls />
      <StatsTracker
        comparisons={stats.comparisons}
        swaps={stats.swaps}
        totalTime={stats.totalTime}
      />
      <ChartDisplay history={history} />
      <SummaryModal visible={showModal} onClose={() => setShowModal(false)} stats={stats} />
    </div>
  );
}

export default App;
