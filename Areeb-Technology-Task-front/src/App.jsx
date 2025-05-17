import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layouts/Layout";
import { Home, Login, SignUp } from "./Pages";
import CreateEvent from "./Components/Events/CreateEvent";
import SingleEvent from "./Pages/SingleEvent";

export default function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: "auth/login", element: <Login /> },
        { path: "auth/signup", element: <SignUp /> },
        { path: "/CreateEvent", element: <CreateEvent /> },
        { path: "/events/:id", element: <SingleEvent /> },
        { path: "*", element: <h1 className="py-64">404 Not Found</h1> },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
