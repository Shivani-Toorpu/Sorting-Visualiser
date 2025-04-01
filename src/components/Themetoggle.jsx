import React, { useEffect, useState } from "react";

export default function Themetoggle() {
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <button
      onClick={() => setDarkMode(!darkMode)}
      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white flex items-center space-x-2"
    >
      <span>{darkMode ? '🌙' : '☀️'}</span>
      <span>{darkMode ? 'Dark' : 'Light'}</span>
    </button>
  );
}
