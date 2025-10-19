import { lazy } from "react";
import { createBrowserRouter, redirect } from "react-router-dom";
import App from "./App";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const AdminRecipes = lazy(() =>
  import("./pages/admin/pages/AdminRecipes/AdminRecipes")
);
const AdminUsers = lazy(() =>
  import("./pages/admin/pages/AdminUsers/AdminUsers")
);

const AdminRecipesForm = lazy(() =>
  import(
    "./pages/admin/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipesForm"
  )
);

const AdminRecipesList = lazy(() =>
  import(
    "./pages/admin/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList"
  )
);

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "recipes",
            element: <AdminRecipes />,
            children: [
              {
                index: true,
                loader: async () => redirect("/admin/recipes/list"),
              },
              {
                path: "list",
                element: <AdminRecipesList />,
              },
              {
                path: "new",
                element: <AdminRecipesForm />,
              },
              {
                path: "edit/:recipeId",
                element: <AdminRecipesForm />,
              },
              {
                path: "users",
                element: <AdminUsers />,
              },
            ],
          },
          {
            index: true,
            loader: async () => redirect("/admin/recipes"),
          },
        ],
      },
    ],
  },
]);
