import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../myMethods';
import { AuthContext, GlobalAuthStateProvider } from '../../MyContext';
import FormsModalComponent from '../FormsModalComponent/FormsModalComponent';
import axios from 'axios';

function Dashboard() {
  
    const navigate = useNavigate();
    const {loggedInUser,isSignedIn,invokeStateUpdate} = useContext(AuthContext);
    const [showFormsModal,setShowFormsModal] = useState(false);
    const [token,setToken] = useState(localStorage.getItem('accessToken'));
    const [myProjects,setMyProjects] = useState([]);
    const handleLogOut =()=>{
        localStorage.removeItem('accessToken');
        setToken('');
        invokeStateUpdate(false);    
        navigate("/Login");
      }

    
      // var loggedInUser= useContext(AuthContext);
    
    const handleAddProject =() =>{
      setShowFormsModal(true);
    }

    useEffect(()=>{
      getMyProjects();
  },[isSignedIn]);
  let projects ='';
  const getMyProjects = async () => {
    const base_URL = process.env.REACT_APP_PROJECT_BASE_URL;
    try {
      const response = await axios.get(`${base_URL}/${loggedInUser?.id}`)
      projects = response.data;
      setMyProjects(projects.projects);
    } catch (error) {
      console.log(error);
      return null;
    }
  };
 
  return (
    <div>
    Dashboard
    {myProjects.map((item, index) => (
        <li key={index}>{JSON.stringify(item.project_Description)}</li>
      ))}
    {/* {data.map((item) => (
        <div>{item}</div>
      ))} */}
      
    <FormsModalComponent show={showFormsModal} onHide={()=>setShowFormsModal(false)}/>
    <p>User: {loggedInUser ? loggedInUser.userName : ''}</p>
    <p>email: {loggedInUser ? loggedInUser.email : ''}</p>
    <p>user id: {loggedInUser ? loggedInUser.id : ''}</p>

    
    <p>Is Signed In: {isSignedIn ? 'true' : 'false'}</p>
    <button onClick={handleAddProject}>ADD Project</button>
    <button onClick={handleLogOut}>Logout</button>
  </div>
  )
}

export default Dashboard