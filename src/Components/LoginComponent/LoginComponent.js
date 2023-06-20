import axios from 'axios';
import React, { useState } from 'react'


function LoginComponent() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const handleEmailChange = (value)=>{
        setEmail(value);
    }
    const handlePasswordChange = (value)=>{
        setPassword(value);
    }

    const handleLogin = ()=>{
        const data={
            Email:email,
            Password:password,
        };

        const url = 'https://localhost:7003/api/controller/login';
        
        const token = localStorage.getItem('accessToken');
        if(token=='')
        {
            axios.post(url,data).then((result)=>{   
                alert(result.data);
                localStorage.setItem('accessToken', result.data);
                //redirect to home here
            }).catch((error)=>{
                alert(error);
            })
        }
    }

  return (
    <div>
        <label>Email</label>
        <input type='email' id='email' placeholder='Enter Email'onChange={(e)=>handleEmailChange(e.target.value)}/>
        <label>Password</label>
        <input type='password' id='password' placeholder='Enter password'onChange={(e)=>handlePasswordChange(e.target.value)}/>
        <button onClick={()=>handleLogin()}>Login</button>
    </div>
  )
}

export default LoginComponent