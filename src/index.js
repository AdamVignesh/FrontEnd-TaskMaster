import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import RegistrationComponent from './Components/RegistrationComponent/RegistrationComponent';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Components/DashboardComponent/Dashboard';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/Login",
    element: <LoginComponent/>,
  },
  {
    path: "/Register",
    element: <RegistrationComponent/>,
  },
  {
    path: "/Dashboard",
    element: <Dashboard/>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();
