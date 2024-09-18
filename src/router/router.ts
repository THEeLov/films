import { createBrowserRouter } from "react-router-dom";
import Homepage from "../pages/Homepage";
import MainLayout from "../layouts/MainLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";
import FilmAdd from "../pages/FilmAdd";
import FilmView from "../pages/FilmView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Homepage,
      },
      {
        path: "/film-add",
        Component: FilmAdd,
      },
      {
        path: "/film/:id",
        Component: FilmView
      },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/register",
    Component: Register,
  },
]);
