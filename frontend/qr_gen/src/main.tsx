import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomeView from "./views/home/Dashboard.tsx";
import RegisterView from "./views/auth/RegisterView.tsx";
import "./index.css";
import "./App.css";
import ErrorPage from "./components/ErrorPage.tsx";
import VerificationEmail from "./views/auth/VerificationEmail.tsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./views/stores/UserContext.tsx";
import Link from "./views/home/generate/Link.tsx";
import ContactCard from "./views/home/generate/ContactCard.tsx";
import UploadFile from "./views/home/generate/UploadFile.tsx";
import DownloadError from "./components/DowloadError.tsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
    children: [
      {
        path: "generate/link",
        element: <Link />,
      },
      {
        path: "generate/contact-card",
        element: <ContactCard />,
      },
      {
        path: "generate/upload-file",
        element: <UploadFile />,
      },
    ],
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <App />,
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
  {
    path: "/dowload-error",
    element: <DownloadError />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <UserProvider>
      <>
        <RouterProvider router={router} />
        <ToastContainer />
      </>
    </UserProvider>
  </React.StrictMode>
);
