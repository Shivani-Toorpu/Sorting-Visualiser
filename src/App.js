import React, { useState } from 'react';
import './App.css';
import { bubbleSort } from './algorithms/bubbleSort';
import { insertionSort } from './algorithms/insertionSort';
import { selectionSort } from './algorithms/selectionSort';
import { quickSort } from './algorithms/quickSort';
import { mergeSort } from './algorithms/mergeSort';
import ComparisonPanel from './components/ComparisonPanel';

function App() {
  const [array, setArray] = useState([]);
  const [stateMap, setStateMap] = useState({});
  const [tooltip, setTooltip] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubbleSort');
  const [speed, setSpeed] = useState(1);
  const [comparisons, setComparisons] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [arraySize, setArraySize] = useState('');
  const [inputArray, setInputArray] = useState('');

  const handleArraySizeChange = (e) => {
    const size = parseInt(e.target.value);
    if (!isNaN(size) && size > 0 && size <= 50) {
      setArraySize(size);
    }
  };

  const handleInputArrayChange = (e) => {
    setInputArray(e.target.value);
  };

  const createArray = () => {
    const elements = inputArray
      .trim()
      .split(/\s+/)
      .map(num => parseInt(num))
      .filter(num => !isNaN(num));

    if (elements.length === parseInt(arraySize)) {
      setArray(elements);
      setStateMap({});
      setTooltip('');
      setComparisons([]);
    } else {
      alert(`Please enter exactly ${arraySize} valid numbers separated by spaces`);
    }
  };

  const resetArray = () => {
    setIsRunning(false);
    setArray([]);
    setInputArray('');
    setArraySize('');
  };

  const waitForStep = () => {
    return Promise.resolve();
  };

  const stats = {
    startTimer: () => {},
    stopTimer: () => {},
    setComparisons: (fn) => {},
    setSwaps: (fn) => {},
  };

  const handleSort = async () => {
    if (array.length === 0) {
      alert('Please create an array first');
      return;
    }

    setIsRunning(true);
    setComparisons([]);
    
    try {
      const algorithms = {
        bubbleSort,
        insertionSort,
        selectionSort,
        quickSort,
        mergeSort
      };

      await algorithms[selectedAlgorithm](
        array,
        setArray,
        setStateMap,
        setTooltip,
        speed,
        waitForStep,
        stats,
        setComparisons
      );
    } catch (error) {
      console.error('Sorting error:', error);
    }
    
    setIsRunning(false);
  };

  const getMaxValue = () => {
    return Math.max(...array, 100);
  };

  const getScaleMarkers = () => {
    const markers = [];
    for (let i = 0; i <= 100; i += 10) {
      markers.push(i);
    }
    return markers;
  };

  return (
    <div className="App">
      <div className="header">
        <h1>Sorting Visualizer</h1>
      </div>

      <div className="main-content">
        <div className="input-section">
          <div className="input-field">
            <input
              type="number"
              placeholder="Enter array size"
              value={arraySize}
              onChange={handleArraySizeChange}
              disabled={isRunning}
              min="1"
              max="50"
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              placeholder={`Enter ${arraySize || 'N'} space-separated numbers`}
              value={inputArray}
              onChange={handleInputArrayChange}
              disabled={isRunning || !arraySize}
            />
          </div>
          <button 
            className="create-btn"
            onClick={createArray} 
            disabled={isRunning || !arraySize || !inputArray.trim()}
          >
            Create Array
          </button>
        </div>

        <div className="control-section">
          <select 
            value={selectedAlgorithm} 
            onChange={(e) => setSelectedAlgorithm(e.target.value)}
            disabled={isRunning}
          >
            <option value="bubbleSort">Bubble Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="mergeSort">Merge Sort</option>
          </select>

          <button onClick={handleSort} disabled={isRunning || array.length === 0}>
            Sort
          </button>

          <button onClick={resetArray} disabled={isRunning}>
            Reset
          </button>

          <button 
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            className={isPanelOpen ? 'active' : ''}
          >
            Comparisons
          </button>

          <div className="speed-control">
            <label>Speed:</label>
            <input
              type="range"
              min="0.25"
              max="2"
              step="0.25"
              value={speed}
              onChange={(e) => setSpeed(parseFloat(e.target.value))}
              disabled={isRunning}
            />
            <span>{speed}x</span>
          </div>
        </div>

        <div className="visualization-section">
          <div className="array-container">
            <div className="scale-markers">
              {getScaleMarkers().map((value) => (
                <div key={value} className="scale-marker">
                  {value}
                </div>
              ))}
            </div>
            {array.map((value, idx) => (
              <div
                key={idx}
                className={`array-bar ${stateMap[idx] || ''}`}
                style={{
                  height: `${(value / getMaxValue()) * 100}%`,
                  width: '60px'
                }}
                data-value={value}
              />
            ))}
          </div>
          {tooltip && <div className="tooltip">{tooltip}</div>}
        </div>
      </div>

      <ComparisonPanel 
        comparisons={comparisons}
        isOpen={isPanelOpen}
      />
    </div>
  );
}

export default App;