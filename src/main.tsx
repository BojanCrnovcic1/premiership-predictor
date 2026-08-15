import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./styles/main.scss";
import App from "./App";
import { AuthProvider } from "./features/auth/context/AuthContext";

// Registracija Service Worker-a samo u production buildu
if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((reg) => {
        console.log("SW registrovan uspješno:", reg.scope);
      })
      .catch((err) => {
        console.error("Greška pri registraciji SW:", err);
      });
  });
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
);
