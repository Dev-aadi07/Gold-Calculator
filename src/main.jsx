/**
 * main.jsx
 * ---------
 * Entry point. React 18 uses createRoot instead of ReactDOM.render.
 * This is the standard Vite + React setup.
 */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
