import React from 'react';
import './ComparisonPanel.css';

const ComparisonPanel = ({ comparisons, isOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="comparison-panel">
      <h3>Comparisons</h3>
      <div className="comparisons-list">
        {comparisons.map((comparison, index) => (
          <div key={index} className="comparison-item">
            <div className="numbers">{comparison.numbers}</div>
            <div className="result">{comparison.result}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonPanel; 