import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AppProvider } from "./app/providers";
import "@/shared/styles/main.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProvider />
  </StrictMode>,
);
