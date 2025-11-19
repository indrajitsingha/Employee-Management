import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { ToastContainer } from "react-toastify";
import ProtectedRoutes from "./pages/ProtectedRoutes";
import Loader from "./components/Loader";

const AddEmployee = lazy(() => import("./pages/AddEmployee/AddEmployee"));
const ShowEmployees = lazy(() => import("./pages/ShowEmployees/ShowEmployees"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes />,
    children: [
      { index: true, element: <AddEmployee /> },
      { path: "employee", element: <ShowEmployees /> },
    ],
  },
]);

const App = () => {
  return (
    <Suspense fallback={<Loader/>}>
      <RouterProvider router={router} />
      <ToastContainer />
    </Suspense>
  );
};

export default App;
