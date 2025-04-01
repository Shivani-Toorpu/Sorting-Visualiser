import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { SortingProvider } from "./context/SortingContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <SortingProvider>
      <App />
    </SortingProvider>
  </React.StrictMode>
);
