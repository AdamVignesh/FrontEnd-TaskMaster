import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import SelectedProjectComponent from '../ProjectDetailsComponent/ProjectDetailsComponent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../MyContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle,faUserPlus,faTasks} from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from "react-bootstrap";


import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './CardStyles.css';
import { isLoggedIn } from '../../myMethods';



function CardComponent(props) {

  const navigate = useNavigate();
  const {invokeGetTasks,isGetImages,setIsGetImages,setProjectProgress,setShowFormsModal,invokeRoleChange,invokeShowAddTask,invokeProjects,loggedInUser} = useContext(AuthContext);
  const[memberImages,setMemberImages] = useState([]);
  const[daysLeft,setDaysLeft] = useState();

  const handleProjectClick=()=>{  
    invokeGetTasks(true);
    setProjectProgress(props.progress);
    navigate('/ProjectDetails',{state:{id:props.id ,title:props.title,description:props.description}});
  }

  const getMemberImages = async()=>{
    console.log("getting user images");
    const getMemberImagesURL = process.env.REACT_APP_GET_MEMBER_IMAGES_OF_PROJECT;
    try {
      const response = await axios.get(`${getMemberImagesURL}${props.id}`).then(res=>{
        console.log(res.data.imageUrl +"im image");
        setMemberImages(res.data.imageUrl);
        setIsGetImages(false);
      })
    
      // setMemberImages(response);
      // const data = await response.json;
    } 
    catch (error) {
      console.log(error);
      return null;
    }
  }

  
  const getRemainingDays = ()=>{
    const currentDate = new Date();
    const deadlineDate = new Date(props.deadline); 
    const timeDiff = deadlineDate.getTime() - currentDate.getTime();

     setDaysLeft(Math.ceil(timeDiff / (1000 * 3600 * 24)));
  }

  useEffect(()=>{
      getMemberImages();
      getRemainingDays();
   },[isGetImages,invokeProjects]);
   


   const handleAddMembers=()=>{
    setShowFormsModal(true);
  }

  const handleCloseModal=()=>{
    setShowFormsModal(false);
     invokeRoleChange(null);
     invokeShowAddTask(false);
  }

  const handleAddTask= ()=>{
    setShowFormsModal(true);
    invokeShowAddTask(true);
  }




  return (
    <Card onClick={handleProjectClick} border="light" className='mb-4  border-2 shadow card-hover' >
        <Card.Header style={{backgroundColor:"#fff"}} className='d-flex justify-content-between'>
          <div className="project-title">
             <h5>{props.title}</h5> 
          </div>
          <div>
            
          {memberImages.length?memberImages.length <= 3 ? (
            memberImages.map((item, index) => (
              <img key={index} src={item} style={{ width: "30px", margin:"-3px" }} />
            ))
            ) : (
            <>
              {memberImages.slice(0, 3).map((item, index) => (
                <img key={index} src={item} style={{ width: "30px",margin:"-3px" }} />
              ))}
                <FontAwesomeIcon icon={faPlusCircle}/>
            </>
            ):null}
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title >
           <div className="w-100 d-flex justify-content-between align-items-center">
           <div>
            {props.description}
           </div>
            <div className="circle-progress-bar" style={{width:"100px"}}>
              {/* <ProgressBar
                now={props.progress}
                label={`${props.progress}%`}
                variant="info"
                className="circle-progress-bar-inner"
                srOnly
              /> */}
            <CircularProgressbar 
              value={props.progress}
              text={`${props.progress}%`}
              background
              backgroundPadding={6}
              styles={buildStyles({
                backgroundColor: "#9f5298",
                textColor: "#fff",
                pathColor: "#fff",
                trailColor: "transparent"
              })}
              />
              
            {/* <CircularProgressbar value={props.progress} text={`${props.progress}%`} className='w-25' /> */}
            </div>
            </div>       
          </Card.Title>

          <Card.Text>
            {loggedInUser?.role=="Manager"?
                <div className='flex-column'>
                    
                      <FontAwesomeIcon className='m-1' onClick={handleAddMembers} icon={faUserPlus}/>
                      <FontAwesomeIcon className='m-1' onClick={handleAddTask} icon={faTasks}/>
                    
                </div>
            :null}
          </Card.Text>
        </Card.Body>
      </Card>  
      )
}

export default CardComponent