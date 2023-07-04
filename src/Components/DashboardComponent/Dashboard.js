import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getUserDetails } from '../../myMethods';
import { AuthContext, GlobalAuthStateProvider } from '../../MyContext';
import axios from 'axios';
import debounce from 'lodash.debounce';


import TopBar from '../TopBarComponent/TopBar';
import './Dashboard.css';
import SideBar from '../SideBarComponent/SideBar';
import CardComponent from '../CardComponent/CardComponent';
import { Col, Container, Row } from 'react-bootstrap';
import ModalComponent from '../ModalComponent/ModalComponent';
import FormComponent from '../FormComponent/FormComponent';
import { MDBContainer } from 'mdbreact';
import "./scrollbar.css";



function Dashboard() {
  
    const navigate = useNavigate();
    const {loggedInUser,isSignedIn,invokeProjects,invokeStateUpdate,showFormsModal,setShowFormsModal,invokeDashboardMenu} = useContext(AuthContext);
    const [myProjects,setMyProjects] = useState([]);
    const [searchQuery,setSearchQuery] = useState();
    const [myProjectsForCache,setMyProjectsForCache] = useState([]);

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

  
  const extractedProjects = [];

  const getMyProjects = async () => {
    var projects =[];
      if(loggedInUser.role =="Manager")
      {
        const base_URL = process.env.REACT_APP_PROJECT_BASE_URL;
        try {
          const response = await axios.get(`${base_URL}/${loggedInUser?.id}`)
          projects = response.data;
          console.log("in projects success");
          console.log(projects.projects);
          setMyProjects(projects.projects);
          setMyProjectsForCache(projects.projects);
        } 
        catch (error) {
          console.log(error);
          return null;
        }
      }
      else
      {
        let i=0;
        const base_URL = process.env.REACT_APP_GET_USER_PROJECTS;
        try {
          const response = await axios.get(`${base_URL}/${loggedInUser?.id}`)
          projects = response.data;
          console.log("in projects success");
          console.log(projects);
          setMyProjects(projects);
          setMyProjectsForCache(projects); 
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


  const debouncedSearch = React.useCallback(
    debounce(async (query,myProjects,myProjectsForCache) => {
      if(query.length==0){
        console.log("if" +query);
        setMyProjects(myProjectsForCache);
      }else{
        console.log(query);
        setMyProjects(myProjectsForCache.filter(item => item.project_Title.includes(query)));
      }
    }, 500),
    []
  );

  const handleSearchChange=(e)=>{
    setSearchQuery(e.target.value);
    debouncedSearch(e.target.value,myProjects,myProjectsForCache);
  }
  invokeDashboardMenu();


  return(
    <div>
      <TopBar searchChange={handleSearchChange} handleAddProjectClick={handleAddProject} handleLogOut={handleLogOut} imageUrl={loggedInUser?.imgUrl} name={loggedInUser?.userName}/>

      <div className="parent-container">
        <ModalComponent showModal={showFormsModal} popUpTitle="Add Project" popUpContent={<FormComponent/>} handleCloseModal={()=>setShowFormsModal(false)}/> 

        <div className="scrollbar scrollbar-primary mt-5 mx-auto child-div child-div2">
        <Container>
          <Row>
            {myProjects?.slice().reverse().map((item, index) => (
              <Col lg={6} md={6} sm={12}>
                <CardComponent onClick={handleProjectClick} key={index}  id={item.project_id} title={item.project_Title} deadline={item.deadline} description={item.project_Description} progress={item.project_Progress}/>
                </Col>
                ))}
          </Row>
        </Container>
        </div>
        <div className="mt-5 child-div child-div3">Third Div (30%)</div>
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