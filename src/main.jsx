import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/styles/index.scss";
import App from "./App.jsx";
import { ApiContext } from "./context/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext.Provider value="https://restapi.fr/api/recipes">
      <App />
    </ApiContext.Provider>
  </StrictMode>
);
