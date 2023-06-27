import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import FormComponent from '../FormComponent/FormComponent';

function FormsModalComponent(props) {

  return (
    <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
              <Modal.Title>Add a project</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormComponent/>              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.onHide}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>  
  )
}

export default FormsModalComponent