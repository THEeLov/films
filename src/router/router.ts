import { createBrowserRouter } from "react-router-dom"
import Homepage from "../pages/Homepage"
import MainLayout from "../layouts/MainLayout"
import Login from "../pages/Login"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Homepage
      }
    ]
  },
  {
    path: "/login",
    Component: Login
  }
])
