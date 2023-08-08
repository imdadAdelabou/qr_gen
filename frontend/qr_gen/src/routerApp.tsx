import HomeView from "./views/home/HomeView.tsx";
import RegisterView from "./views/auth/RegisterView.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import VerificationEmail from "./views/auth/VerificationEmail.tsx";
import Link from "./views/home/generate/Link.tsx";
import ContactCard from "./views/home/generate/ContactCard.tsx";
import UploadFile from "./views/home/generate/UploadFile.tsx";
import DownloadError from "./components/DowloadError.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import LoginView from "./views/auth/LoginView.tsx";
import AllQr from "./views/home/AllQr.tsx";

const routerApp = createBrowserRouter(
  createRoutesFromElements([
    <Route path="/" element={<HomeView />}>
      <Route index path="/" element={<AllQr />} />
      <Route path="generate/link" element={<Link />} />
      <Route path="generate/contact-card" element={<ContactCard />} />
      <Route path="generate/upload-file" element={<UploadFile />} />
    </Route>,
    <Route path="/login" element={<LoginView />} />,
    <Route path="/register" element={<RegisterView />} />,
    <Route path="/verify-email" element={<VerificationEmail />} />,
    <Route path="/dowload-error" element={<DownloadError />} />,
  ])
);

export default routerApp;
