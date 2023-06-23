import React from 'react'
import { Button, Modal } from 'react-bootstrap'

function ModalComponent(props) {
  return (
    <Modal show={props.showModal} onHide={props.handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>{props.popUpTitle}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{props.popUpContent}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={props.handleCloseModal}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>  
  )
}

export default ModalComponent