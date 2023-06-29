import React from 'react'
import { Card } from 'react-bootstrap'
import SelectedProjectComponent from '../ProjectDetailsComponent/ProjectDetailsComponent';
import { useNavigate } from 'react-router-dom';


function CardComponent(props) {

  const navigate = useNavigate();

  const handleProjectClick=()=>{

    navigate('/ProjectDetails',{state:{id:props.id ,title:props.title,description:props.description,}});
  }
  return (
    <Card onClick={handleProjectClick} border="primary" className='mb-4' >
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Title>{props.id}</Card.Title>
          <Card.Text>
            {props.description}
          </Card.Text>
        </Card.Body>
      </Card>  
      )
}

export default CardComponent