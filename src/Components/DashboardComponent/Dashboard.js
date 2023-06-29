import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../myMethods';
import { AuthContext, GlobalAuthStateProvider } from '../../MyContext';
import axios from 'axios';

import TopBar from '../TopBarComponent/TopBar';
import './Dashboard.css';
import SideBar from '../SideBarComponent/SideBar';
import CardComponent from '../CardComponent/CardComponent';
import { Col, Container, Row } from 'react-bootstrap';
import ModalComponent from '../ModalComponent/ModalComponent';
import FormComponent from '../FormComponent/FormComponent';


function Dashboard() {
  
    const navigate = useNavigate();
    const {loggedInUser,isSignedIn,invokeProjects,invokeStateUpdate,showFormsModal,setShowFormsModal} = useContext(AuthContext);
    const [myProjects,setMyProjects] = useState([]);

    const handleLogOut =()=>{
        localStorage.removeItem('accessToken');
        invokeStateUpdate(false);    
        navigate("/Login");
      }
      // var loggedInUser= useContext(AuthContext);
    
    const handleAddProject =() =>{
      setShowFormsModal(true);
    }
    useEffect(()=>{
      if(loggedInUser && loggedInUser.id)
      {
        getMyProjects();
      }
  },[loggedInUser,invokeProjects]);

  
  const getMyProjects = async () => {
      let projects =[];
      if(loggedInUser.role =="Manager")
      {
        const base_URL = process.env.REACT_APP_PROJECT_BASE_URL;
        try {
          const response = await axios.get(`${base_URL}/${loggedInUser?.id}`)
          projects = response.data;
          console.log("in projects success");
          setMyProjects(projects.projects);
          console.log(projects);
        } 
        catch (error) {
          console.log(error);
          return null;
        }
      }
      else
      {
        const base_URL = process.env.REACT_APP_GET_USER_PROJECTS;
        try {
          const response = await axios.get(`${base_URL}/${loggedInUser?.id}`)
          projects = response.data.projects;
          console.log("in projects success");
          setMyProjects(projects);
          console.log(response.data);
        } 
        catch (error) {
          console.log(error);
          return null;
        }
        
      }
    }
  const handleProjectClick=()=>{
    alert("im in");
  }
  return(
    <div>
      <TopBar imageUrl={loggedInUser?.imgUrl} name={loggedInUser?.userName} onClick={handleLogOut}/>

      <div className="parent-container">

        <ModalComponent showModal={showFormsModal} popUpTitle="Add Project" popUpContent={<FormComponent/>} handleCloseModal={()=>setShowFormsModal(false)}/>
    
        <SideBar handleAddProjectClick={handleAddProject}/>
 
        <div className="child-div child-div2">
        <Container>
          <Row>
            {myProjects?.slice().reverse().map((item, index) => (
            <Col lg={6} md={6} sm={12}>
                <CardComponent onClick={handleProjectClick} key={index}  id={item.project_id} title={item.project_Title} description={item.project_Description} />
                </Col>
                ))}
          </Row>
        </Container>
        </div>

        <div className="child-div child-div3">Third Div (30%)</div>
     </div>
    </div>
  )
}

export default Dashboard

/* 
{myProjects.map((item, index) => (
        <li key={index} onClick={handleProjectClick}>{JSON.stringify(item.project_Description)}</li>
      ))}
    {{data.map((item) => (
        <div>{item}</div>
      ))} 
      
      <FormsModalComponent show={showFormsModal} onHide={()=>setShowFormsModal(false)}/>
      <p>User: {loggedInUser ? loggedInUser.userName : ''}</p>
      <p>email: {loggedInUser ? loggedInUser.email : ''}</p>
      <p>user id: {loggedInUser ? loggedInUser.id : ''}</p>
  
      
      <p>Is Signed In: {isSignedIn ? 'true' : 'false'}</p>
      <button onClick={handleAddProject}>ADD Project</button>
      <button onClick={handleLogOut}>Logout</button>
*/