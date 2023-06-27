import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import LoginComponent from './Components/LoginOrRegComponent/LoginOrRegComponent';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Dashboard from './Components/DashboardComponent/Dashboard';
import Protected from './Components/Protected';
import UnProtected from './Components/UnProtected';
import { GlobalAuthStateProvider } from './MyContext';
import Test from './Components/test';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "/Login",
    element: 
      <Protected>
        <LoginComponent/>,
      </Protected>
  },
  {
    path: "/Dashboard",
    element: 
      <UnProtected>
        <Dashboard/>,
      </UnProtected>
  },
  {
    path:"/Test",
    element: <Test/>
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalAuthStateProvider>
    <RouterProvider router={router} />
  </GlobalAuthStateProvider>
  </React.StrictMode>
);

reportWebVitals();


