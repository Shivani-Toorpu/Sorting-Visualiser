import React from "react";

function Tooltip({ message }) {
  return (
    <div className="text-center mt-4 text-lg font-medium bg-yellow-200 text-yellow-800 px-4 py-2 rounded shadow w-fit mx-auto">
      {message}
    </div>
  );
}

export default Tooltip;
