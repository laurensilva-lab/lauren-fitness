// ============================================================
// PUNTO DE ENTRADA — No modificar salvo que sepas lo que hacés
// ============================================================
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { initProtection } from "./protection.js";

// Activar protección de contenido al cargar la app
initProtection();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
