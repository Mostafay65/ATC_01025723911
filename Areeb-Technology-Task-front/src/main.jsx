import React from "react";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import App from "./App";
import "./index.css";
import { twMerge } from "tailwind-merge";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PrimeReactProvider
      value={{
        pt: {},
        ptOptions: {
          mergeSections: true,
          mergeProps: true,
          classNameMergeFunction: twMerge,
        },
      }}
    >
      <App />
    </PrimeReactProvider>
  </React.StrictMode>
);
