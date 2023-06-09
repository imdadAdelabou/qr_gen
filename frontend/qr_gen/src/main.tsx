import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import HomeView from './views/home/dashboard.tsx';
import LoginView from './views/auth/LoginView.tsx';
import RegisterView from './views/auth/RegisterView.tsx';
import './index.css';
import './App.css';

const router = createBrowserRouter([{
  path: "/",
  element: <HomeView />,
},
{
  path: "/login",
  element: <App />,
},
{
  path: "/register",
  element: <RegisterView />,
}
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
