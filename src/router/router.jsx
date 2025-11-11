import { createBrowserRouter } from "react-router";
import HomeLayout from "../layouts/HomeLayout";
import Home from "../pages/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import PrivateRoute from "../provider/PrivateRoute";
import AcceptedTask from "../pages/AcceptedTask";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        index: true,
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/all-jobs",
      },
      {
        path: "/add-job",
      },
      {
        path: "/my-accepted-tasks",
        element: <PrivateRoute><AcceptedTask></AcceptedTask></PrivateRoute>
      },
      {
        path: "/auth",
        element: <AuthLayout></AuthLayout>,
        children: [
          {
            path: "/auth/login",
            element: <Login></Login>,
          },
          {
            path: "/auth/signup",
            element: <Register></Register>,
          },
        ],
      },
    ],
  },
]);

export default router;
