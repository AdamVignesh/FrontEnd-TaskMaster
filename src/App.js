import logo from './logo.svg';
import './App.css';
import RegistrationComponent from './Components/RegistrationComponent/RegistrationComponent';
import LoginComponent from './Components/LoginComponent/LoginComponent';
import { useState } from 'react';


function App() {
  const [token,setToken] = useState(localStorage.getItem('accessToken'));

  const handleLogOut =()=>{
    localStorage.setItem('accessToken','');
    setToken(localStorage.getItem('accessToken'));
  }

  return (
    <div className="App">
      {token==''? <LoginComponent/> : <button onClick={()=>handleLogOut()}>LogOut</button> }
      {token}
      {/* <RegistrationComponent/> */}
    </div>
  );
}

export default App;
