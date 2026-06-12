// src/App.jsx
import React from "react";
import AppRoute from "./routes/AppRoute";
import { Toaster } from "sonner"

const App = () => {
  return (
    <>
      <AppRoute />

      <Toaster
        position="top-right"
        richColors
        closeButton
      />
    </>

  );
};

export default App;