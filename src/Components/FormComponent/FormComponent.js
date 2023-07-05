import React, { useContext, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { AuthContext } from '../../MyContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdd } from '@fortawesome/free-solid-svg-icons';

function FormComponent() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    deadline: '',
  });

  const { loggedInUser, InvokeProjectsToggle, setShowFormsModal } =
    useContext(AuthContext);

  const base_URL = process.env.REACT_APP_PROJECT_BASE_URL;

  const validateForm = () => {
    let isValid = true;
    const errors = {
      title: '',
      description: '',
      deadline: '',
    };

    if (title.trim() === '') {
      isValid = false;
      errors.title = 'Project title is required';
    }

    if (description.trim() === '') {
      isValid = false;
      errors.description = 'Description is required';
    }

    if (deadline.trim() === '') {
      isValid = false;
      errors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(deadline);
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 3);
      if (selectedDate < currentDate) {
        isValid = false;
        errors.deadline = 'Deadline must be greater than or equal to today';
      }
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const data = {
      Project_Title: title,
      Project_Description: description,
      Deadline: deadline,
      User_Id: loggedInUser.id,
    };

    axios
      .post(base_URL, data)
      .then((result) => {
        setShowFormsModal(false);
        InvokeProjectsToggle();
      })
      .catch((error) => {
        alert(error);
        console.log(error);
      });
  };

  return (
    <Container>
      <Row className="justify-content-center">
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Project Title:</Form.Label>
              <Form.Control
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                isInvalid={formErrors.title !== ''}
                style={{ borderColor: '#9f5298' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.title}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                isInvalid={formErrors.description !== ''}
                style={{ borderColor: '#9f5298' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.description}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="deadline">
              <Form.Label>Deadline:</Form.Label>
              <Form.Control
                type="date"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                isInvalid={formErrors.deadline !== ''}
                style={{ borderColor: '#9f5298' }}
              />
              <Form.Control.Feedback type="invalid">
                {formErrors.deadline}
              </Form.Control.Feedback>
            </Form.Group>

            <div className="d-flex justify-content-center align-items-center m-1">
              <Button className="w-50" style={{ backgroundColor: '#9f5298' }} type="submit">
                Add <FontAwesomeIcon icon={faAdd} />
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default FormComponent;
