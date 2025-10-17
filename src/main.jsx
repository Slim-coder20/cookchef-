import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.scss";
import { ApiContext } from "./context/ApiContext.jsx";
import { RouterProvider } from "react-router-dom";
import { ROUTER } from "./route";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext.Provider value="https://restapi.fr/api/recipes">
      <RouterProvider router={ROUTER} />
    </ApiContext.Provider>
  </StrictMode>
);
