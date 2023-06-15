import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/home/dashboard.tsx";
import RegisterView from "./views/auth/RegisterView.tsx";
import "./index.css";
import "./App.css";
import ErrorPage from "./components/ErrorPage.tsx";
import VerificationEmail from "./views/auth/VerificationEmail.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import RequiredAuth from "./helpers/requiredAuth.tsx";
import IsAlreadyConnected from "./helpers/isAlreadyConnected.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: RequiredAuth(<HomeView />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: IsAlreadyConnected(<App />),
    errorElement: <ErrorPage />,
  },
  {
    path: "/register",
    element: <RegisterView />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/verify-email",
    element: <VerificationEmail />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
    <ToastContainer />
  </React.StrictMode>
);
