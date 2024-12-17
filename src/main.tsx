import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const isDevelopment = import.meta.env.MODE === "development";

createRoot(document.getElementById("root")!).render(
  isDevelopment ? (
    <StrictMode>
      <App />
      <ToastContainer />
    </StrictMode>
  ) : (
    <App />
  )
);
