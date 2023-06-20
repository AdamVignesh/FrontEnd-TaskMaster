import React, { useState } from 'react'
import axios from 'axios';

function RegistrationComponent() {

    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [role,setRole] = useState('');
    const [password,setPassword] = useState('');

    const handleNameChange = (value)=>{
        setName(value);
    }
    const handleEmailChange = (value)=>{
        setEmail(value);
    }
    const handleRoleChange = (value)=>{
        setRole(value);
    }
    const handlePasswordChange = (value)=>{
        setPassword(value);
    }

    const handleRegister=()=>{
        const data={
            Name:name,
            Email:email,
            Role:role,
            Password:password,
        };

        const url = 'https://localhost:7003/api/controller/register';

        axios.post(url,data).then((result)=>{   
            alert(result.data);
        }).catch((error)=>{
            alert(error);
        })
    }

  return (
    <div>
        <label>Name</label>
        <input type='text' id='name' placeholder='Enter Name' onChange={(e)=>handleNameChange(e.target.value)}/>
        <label>Email</label>
        <input type='email' id='email' placeholder='Enter Email'onChange={(e)=>handleEmailChange(e.target.value)}/>
        <label>Role</label>
        <input type='text' id='role' placeholder='Enter Role'onChange={(e)=>handleRoleChange(e.target.value)}/>
        <label>Password</label>
        <input type='password' id='password' placeholder='Enter password'onChange={(e)=>handlePasswordChange(e.target.value)}/>
        <button onClick={()=>handleRegister()}>Register</button>
        {/* <h1>{name}</h1> */}
    </div>
  )
}

export default RegistrationComponent;
