import React from 'react'
import { Card } from 'react-bootstrap'
import SelectedProjectComponent from '../ProjectDetailsComponent/ProjectDetailsComponent';
import { useNavigate } from 'react-router-dom';


function CardComponent(props) {

  const navigate = useNavigate();

  const handleProjectClick=()=>{

    navigate('/ProjectDetails',{state:{title:props.title,description:props.description}});
  }
  return (
    <Card onClick={handleProjectClick} border="primary" className='mb-4' >
        <Card.Header>{props.title}</Card.Header>
        <Card.Body>
          <Card.Title>Primary Card Title</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>  
      )
}

export default CardComponent