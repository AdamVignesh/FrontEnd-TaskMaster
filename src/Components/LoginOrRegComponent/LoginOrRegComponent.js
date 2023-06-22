import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { faUser, faLock, faEnvelope,faEyeSlash, faEye, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LoginStyles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Dropdown } from 'react-bootstrap';


import Dashboard from '../DashboardComponent/Dashboard';

function LoginOrRegComponent() {

    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);
    const [LoginOrReg, setLoginOrReg] = new useState(false);
    // login states
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    //reg states
    const [name,setName] = useState('');
    const [role,setRole] = useState('');
    const [file,setFile] = useState();
    const [selectedOption, setSelectedOption] = useState('Your Role');
    const [showHint,setShowHint] = useState(false);


    const handleRoleChange = (value)=>{
        setRole(value);
    }
    const handleFileChange = (value)=>{
        setFile(value);
    }
    const handleNameChange = (value)=>{
        setName(value);
    }
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
                // alert(result.data);
                localStorage.setItem('accessToken', result.data);
                console.log(localStorage.getItem('accessToken'));
                navigate("/Dashboard");
                //redirect to home here
            }).catch((error)=>{
                alert(error);
            })
        }
    }
    const togglePasswordVisibility =()=>
    {
        setShowPassword(!showPassword);
    }


    const handleLoginClick=()=>{
        setLoginOrReg(false);
    }
    const handleRegClick=()=>{
        console.log("in hanlde reg");
        setLoginOrReg(true);
    }
    const handleOptionChange = (eventKey) => {
        setSelectedOption(eventKey);
      };

    const handleMouseEnter = ()=>{
        setShowHint(!showHint);
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
          // alert(result.data);
          navigate("/Dashboard");
          //call a method to navigate
      }).catch((error)=>{
          alert(error);
      })
  }
   
  return (
    <div className={`loginContainer ${LoginOrReg ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form loginForm">
            <h2 className="title">Log in</h2>

            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto '/>
              <input className='LoginInput' type="email" placeholder="Email" onChange={(e)=>handleEmailChange(e.target.value)}/>
            </div>
            <div className="input-field">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="my-auto mx-auto"/>
            <input className='LoginInput' type={showPassword?"text":"password"}  placeholder="Password"onChange={(e)=>handlePasswordChange(e.target.value)} />
            </div>
            <button id='btn' className='btn' onClick={()=>handleLogin()}>Log In</button>
          </form>
          <form action="#" className="sign-up-form loginForm">
            <h2 className="title">Register</h2>
            <div className="input-field">
              <FontAwesomeIcon icon={faUser} className='my-auto mx-auto'/>
              <input className='LoginInput' type="text" placeholder="Username"onChange={(e)=>handleNameChange(e.target.value)} />
            </div>
            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto'/>
              <input className='LoginInput' type="email" placeholder="Email" onChange={(e)=>handleEmailChange(e.target.value)}/>
            </div>
            <div className="input-field">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="my-auto mx-auto"/>
            <input className='LoginInput' type={showPassword?"text":"password"}  placeholder="Password"onChange={(e)=>handlePasswordChange(e.target.value)} />
            </div>
            {/* <div className="input-field"> */}
            <div className="input-field">
              <FontAwesomeIcon icon={faFile} className='my-auto mx-auto'/>
              <input className='LoginInput my-auto mx-auto w-100' type="file" onChange={(e)=>handleFileChange(e.target.value)} onMouseEnter={(e)=>handleMouseEnter(e.target.value)} onMouseLeave={(e)=>handleMouseEnter(e.target.value)}/>
            </div>
            {showHint? <span className='avatar'>*Choose Avatar*</span>:''}
               

            <Dropdown onSelect={handleOptionChange} className="w-200">
                <Dropdown.Toggle variant="dark" id="dropdown-basic">
                    {selectedOption}
                </Dropdown.Toggle>

                <Dropdown.Menu className='dropdown'>
                    <Dropdown.Item eventKey="Manager">MANAGER</Dropdown.Item>
                    <Dropdown.Item eventKey="UI/UX Designer">UI/UX DESIGNER</Dropdown.Item>
                    <Dropdown.Item eventKey="Developer">DEVELOPER</Dropdown.Item>
                    <Dropdown.Item eventKey="Devops">DEVOPS</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <button id='btn' className='btn' onClick={()=>handleRegister()}>Register</button>
            
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3 className='loginh3'>New here?</h3>
            <p className='loginp'>
            Sign up to effortlessly track tasks, collaborate with your team, and streamline your project management! .
            </p>
            <button className="btn transparent" onClick={handleRegClick}>
              Register
              </button>
          </div>
          <img src="teamwork.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3 className='loginh3'>One of us ?</h3>
            <p className='loginp'>
            login now and let's collaborate on projects together, maximizing our collective potential.
            </p>
            <button onClick={handleLoginClick} className="btn transparent" id="sign-in-btn">
              Log in
            </button>
          </div>
          <img src="teamwork2.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  )
}

export default LoginOrRegComponent
 