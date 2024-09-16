import { createBrowserRouter } from "react-router-dom"
import Homepage from "../pages/homepage/Homepage"
import MainLayout from "../layouts/MainLayout"

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
  }
])
