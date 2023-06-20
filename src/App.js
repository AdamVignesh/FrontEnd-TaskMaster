import logo from './logo.svg';
import './App.css';
import RegistrationComponent from './Components/RegistrationComponent/RegistrationComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';



function App() {

  const [token,setToken] = useState(localStorage.getItem('accessToken'));

  return (
    <div className="App">
      console.log(token);
      {token==''?  <Navigate to="/Login"/> : <Navigate to="/Dashboard"/> }
      {/* <RegistrationComponent/> */}
    </div>
  );
}

export default App;
