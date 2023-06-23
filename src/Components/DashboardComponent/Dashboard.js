import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  
    const navigate = useNavigate();
    const [token,setToken] = useState(localStorage.getItem('accessToken'));
    const handleLogOut =()=>{
        localStorage.removeItem('accessToken');
        setToken('');
        navigate("/Login");
      }

  return (
    <div>
        Dashboard
        <button onClick={()=>handleLogOut()}>Logout</button>
    </div>
  )
}

export default Dashboard