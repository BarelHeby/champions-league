import "./App.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import User from "./pages/User";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TableComponent from "./pages/Table";
import Admin from "./pages/Admin";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/user/:id",
      element: <User />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/table",
      element: <TableComponent />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
