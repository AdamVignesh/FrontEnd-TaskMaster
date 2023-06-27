import axios from 'axios';
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { faUser, faLock, faEnvelope,faEyeSlash, faEye, faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './LoginStyles.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Dropdown, Modal } from 'react-bootstrap';
import AWS, { S3 } from 'aws-sdk';


import Dashboard from '../DashboardComponent/Dashboard';
import { image } from 'fontawesome';
import ModalComponent from '../ModalComponent/ModalComponent';
import { AuthContext } from '../../MyContext';

const aws_access_key = process.env.REACT_APP_AWS_ACCESS_KEY;
const aws_secret_key = process.env.REACT_APP_AWS_SECRET_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;
AWS.config.update({
  accessKeyId: aws_access_key ,
  secretAccessKey:aws_secret_key,
  region: 'ap-south-1',
});

function LoginOrRegComponent() {
    const navigate = useNavigate();
    const [showPassword,setShowPassword] = useState(false);
    const [LoginOrReg, setLoginOrReg] = new useState(false);
    // login states
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    //reg states
    const [name,setName] = useState('');
    const [role,setRole] = useState(null);
    const [file,setFile] = useState();
    const [selectedOption, setSelectedOption] = useState('Your Role');
    const [showHint,setShowHint] = useState(false);
    // const [S3Url,setS3Url] = useState();
    const [popUpContent,setPopUpContent] = useState();
    const [popUpTitle,setPopUpTitle] = useState();
    const [dpUrl,setDpUrl] = useState('');

    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const userNameRegex = /^[A-Za-z]+$/;
    const ProperExtensions=['image/jpg','image/jpeg','image/png',];

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
        setRole(eventKey);
      };

    const handleMouseEnter = ()=>{
        setShowHint(!showHint);
    }
    const {invokeStateUpdate} = useContext(AuthContext);

    const handleLogin = (e)=>{
      e.preventDefault();
      console.log("in login da");
        const data={
            Email:email,
            Password:password,
        };
        const url = `${baseUrl}/login`;
        
        const token = localStorage.getItem('accessToken');
        if(token==null)
        {
            axios.post(url,data).then((result)=>{   
                // alert(result.data);
                localStorage.setItem('accessToken', result.data);
                console.log(localStorage.getItem('accessToken'));
                setShowModal(true);
                setPopUpTitle('Success')
                setPopUpContent('Successfully Logged In');
                invokeStateUpdate(true);
                navigate("/Dashboard");
            }).catch((error)=>{
                setShowModal(true);
                setPopUpTitle('Error')
                setPopUpContent('Invalid Login');
            })
        }
    }
  
    const [showModal, setShowModal] = useState(false);

    const uploadToS3 = async () => {
  try {
    const params = {
      Bucket: 'taskmaster-user-avatars',
      Key: `${Date.now()}.${file.name}`,
      Body: image,
      ContentType: file.type,
    };

    const s3 = new S3();
    const { Location } = await s3.upload(params).promise();

    console.log(Location + "=============================");
    console.log('uploading to s3-------------', Location);

    setDpUrl(Location);
    console.log(dpUrl +dpUrl);
  } catch (error) {
    console.log(error);
  }
};

    const handleCloseModal=()=>{
      setShowModal(false);
    }
    const handleRegister =async(e)=>{
      e.preventDefault();
      if (!file){
        setShowModal(true);
        setPopUpTitle("Error");
        setPopUpContent('Choose an Avatar to continue');
        return;
      }
      if(role==null)
      {
        setShowModal(true);
        setPopUpTitle("Error");
        setPopUpContent('Choose Role');
        return;
      }
      if(!passwordRegex.test(password))
      {
        setShowModal(true);
        setPopUpTitle("Error");
        setPopUpContent('Password should contain Minimum 8 characters, at least one uppercase letter, one lowercase letter, and one number');
        return;
      }
      if(!emailRegex.test(email))
      {
        setShowModal(true);
        setPopUpTitle("Error");
        setPopUpContent('Enter proper email address');
        return;
      }
      if(!userNameRegex.test(name) || name.length<3)
      {
        setShowModal(true);
        setPopUpTitle("Error");
        setPopUpContent('Enter valid UserName. Minimum 3 alphabets');
        return;
      }
      
      await uploadToS3();
        
      const data={
          Name:name,
          Email:email,
          Role:role,
          Password:password, 
          ImgUrl:dpUrl,         
      };
      console.log(data);
      const RegUrl = `${baseUrl}/register`;
      console.log(RegUrl + "url");

      axios.post('https://localhost:7003/api/controller/register',data).then((result)=>{   
        console.log(result+" result");
          setShowModal(true);
          setPopUpTitle('Success')
          setPopUpContent('User Registered');
          if(!showModal)
          {
            window.location.reload()
          }
          //call a method to navigate
      }).catch((error)=>{
        // s3.deleteObject(params, function (err, data) {
        //   if (data) {
        //   console.log("File deleted successfully");
        //   }
        //   else {
        //   console.log("Check if you have sufficient permissions : "+err);
        //   }
        //   }); 
        //   // DELETE FROM THE S3 BUCKET IF NOT REGISTERES SUCCESSFULLY;
        console.log(error);
        setShowModal(true);
        setPopUpTitle("Error");
        setPopUpContent('User already registered');
      })
    }

  return (
    <div className={`loginContainer ${LoginOrReg ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form loginForm">
            <h2 className="title">Log in</h2>

            {/* pop up starts*/}
            <ModalComponent showModal={showModal} handleCloseModal={handleCloseModal} popUpTitle={popUpTitle} popUpContent={popUpContent}/>

            <div className="input-field">
              <FontAwesomeIcon icon={faEnvelope} className='my-auto mx-auto '/>
              <input className='LoginInput' type="email" placeholder="Email" onChange={(e)=>handleEmailChange(e.target.value)}/>
            </div>
            <div className="input-field">
            <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility} className="my-auto mx-auto"/>
            <input className='LoginInput' type={showPassword?"text":"password"}  placeholder="Password"onChange={(e)=>handlePasswordChange(e.target.value)} />
            </div>
            <button id='btn' className='btn' onClick={(e)=>handleLogin(e)}>Log In</button>
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
              <input className='LoginInput my-auto mx-auto w-100' type="file" accept="image/*" onChange={(e)=>handleFileChange(e.target.files[0])} onMouseEnter={(e)=>handleMouseEnter(e.target.value)} onMouseLeave={(e)=>handleMouseEnter(e.target.value)}/>
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
            <button id='btn1' className='btn' onClick={(e)=>handleRegister(e)}>Register</button>
            
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
 