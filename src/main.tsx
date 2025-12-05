import React from "react";
import ReactDOM from "react-dom/client";
import AppRouter from "./router/AppRouter";
import { StoreProvider } from "@/app/providers/StoreProvider";
import { ThemeProvider } from "@/app/providers/ThemeProvider";
import "@/styles/globals.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <StoreProvider>
        <AppRouter />
      </StoreProvider>
    </ThemeProvider>
  </React.StrictMode>
);
