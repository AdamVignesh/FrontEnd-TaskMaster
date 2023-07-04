import React, { useContext, useEffect, useState } from 'react'
import { Card } from 'react-bootstrap'
import SelectedProjectComponent from '../ProjectDetailsComponent/ProjectDetailsComponent';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../MyContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { ProgressBar } from "react-bootstrap";

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';




function CardComponent(props) {

  const navigate = useNavigate();
  const {invokeGetTasks} = useContext(AuthContext);
  const[memberImages,setMemberImages] = useState([]);
  const [isGetImages,setIsGetImages] = useState(true);
  const[daysLeft,setDaysLeft] = useState();

  const handleProjectClick=()=>{  
    invokeGetTasks(true);
    navigate('/ProjectDetails',{state:{id:props.id ,title:props.title,description:props.description,}});
  }

  const getMemberImages = async()=>{
    const getMemberImagesURL = process.env.REACT_APP_GET_MEMBER_IMAGES_OF_PROJECT;
    try {
      const response = await axios.get(`${getMemberImagesURL}${props.id}`).then(res=>{
        console.log(res.data.imageUrl);
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
   },[isGetImages]);
   
  return (
    <Card onClick={handleProjectClick} border= "light" className='mb-4  border-2' >
        <Card.Header className='d-flex justify-content-between'>
          <div>
          {props.title}
          </div>
          <div>
          {memberImages.length <= 3 ? (
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
)}


          </div>
        </Card.Header>
        <Card.Body>
          <Card.Title>
          <div className="circle-progress-bar">
          {/* <ProgressBar
            now={props.progress}
            label={`${props.progress}%`}
            variant="info"
            className="circle-progress-bar-inner"
            srOnly
          /> */}
        <CircularProgressbar className='w-25'
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
          </Card.Title>
          <Card.Text>
            {daysLeft}
          </Card.Text>
        </Card.Body>
      </Card>  
      )
}

export default CardComponent