import {createBrowserRouter, RouterProvider} from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Help from "../pages/Help";
import AdminDashboard from "../pages/AdminDashboard";
import Issues from "../pages/Issues";
import UserDashboard from "../pages/UserDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        path: "",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login/>,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "help",
        element: <Help />,
      },
      {
        path: "issues",
        element: <Issues />,
      },
      {
        path: "admin-dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "user-dashboard",
        element: <UserDashboard />,
      },
    ],
  },
]);


export default router;