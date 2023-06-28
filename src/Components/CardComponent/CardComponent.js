import React from 'react'
import { Card } from 'react-bootstrap'

function CardComponent(props) {
  return (
    <Card border="primary" className='mb-4' >
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