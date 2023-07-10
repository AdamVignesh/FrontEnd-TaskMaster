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
import SelectedProjectComponent from './Components/ProjectDetailsComponent/ProjectDetailsComponent';
import Calendar from './Components/CalendarComponent/Calendar';


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
    path:"/Calendar",
    element: <Calendar/>
  },
  {
    path:"/ProjectDetails",
    element:<SelectedProjectComponent/>
  }

]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GlobalAuthStateProvider>
    <RouterProvider router={router} />
  </GlobalAuthStateProvider>
);

reportWebVitals();


