/**
 * index.tsx — Application entry point
 *
 * Renders the React app into the DOM. Wrapping hierarchy:
 *   React.StrictMode → HashRouter → AuthProvider → App
 *
 * HashRouter is used instead of BrowserRouter because the app is
 * deployed on GitHub Pages, which doesn't support client-side routing
 * with proper server configuration.
 *
 * Also includes a MutationObserver that suppresses harmless
 * ResizeObserver errors from the CRA dev overlay.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuth";
import App from "./App";

// Suppress harmless ResizeObserver error in dev overlay
const observer = new MutationObserver(() => {
  const overlay = document.querySelector("iframe[style*='position: fixed']");
  if (overlay) overlay.remove();
});
observer.observe(document.body, { childList: true, subtree: true });

window.addEventListener("error", (e) => {
  if (e.message?.includes("ResizeObserver")) {
    e.stopImmediatePropagation();
  }
});

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <HashRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HashRouter>
  </React.StrictMode>
);
