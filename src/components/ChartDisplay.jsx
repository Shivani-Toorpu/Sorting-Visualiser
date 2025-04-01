import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);

function ChartDisplay({ array, stateMap }) {
  const data = {
    labels: array.map((_, index) => index + 1),
    datasets: [
      {
        data: array,
        backgroundColor: array.map((_, index) => {
          const state = stateMap[index];
          switch (state) {
            case 'comparing':
              return 'rgba(59, 130, 246, 0.8)'; // blue
            case 'swapping':
              return 'rgba(239, 68, 68, 0.8)'; // red
            case 'sorted':
              return 'rgba(34, 197, 94, 0.8)'; // green
            default:
              return 'rgba(156, 163, 175, 0.8)'; // gray
          }
        }),
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 200,
      easing: 'linear'
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(156, 163, 175, 0.1)',
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow" style={{ height: '400px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default ChartDisplay;
