import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApiContext } from "./context/ApiContext.jsx";
import { RouterProvider } from "react-router-dom";
import { ROUTER } from "./route";
import "./assets/styles/index.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext.Provider value="https://restapi.fr/api/recipes">
      <RouterProvider router={ROUTER} />
    </ApiContext.Provider>
  </StrictMode>
);
