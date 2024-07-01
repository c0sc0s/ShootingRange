import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import Login from "../pages/Login";
import Layout from "../pages/Layout/Layout";
import NotFound from "../pages/404/NotFount";
import Map from "../pages/Map/Map";
import Rank from "../pages/Rank";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      // {
      //   path: "/range",
      //   element: <Map />,
      // },
      {
        path: "/rank",
        element: <Rank />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
export default router;
