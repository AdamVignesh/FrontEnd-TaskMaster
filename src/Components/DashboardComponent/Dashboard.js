import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../myMethods';
import { AuthContext, GlobalAuthStateProvider } from '../../MyContext';

function Dashboard() {
  
    const navigate = useNavigate();
    const {loggedInUser,isSignedIn,invokeStateUpdate} = useContext(AuthContext);
    
    const [token,setToken] = useState(localStorage.getItem('accessToken'));
    const handleLogOut =()=>{
        localStorage.removeItem('accessToken');
        setToken('');
        invokeStateUpdate(false);    
        navigate("/Login");
      }
    
      // var loggedInUser= useContext(AuthContext);
 
  return (
    <div>
    Dashboard
    <p>User: {loggedInUser ? loggedInUser.userName : ''}</p>
    <p>email: {loggedInUser ? loggedInUser.email : ''}</p>

    <p>Is Signed In: {isSignedIn ? 'true' : 'false'}</p>
    <button onClick={handleLogOut}>Logout</button>
  </div>
  )
}

export default Dashboard