import React, { useContext, useEffect, useState } from 'react';
import { Form, Button, Container, Dropdown, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../MyContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTasks } from '@fortawesome/free-solid-svg-icons';

function AddTask(props) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    file: null,
    deadline: '',
    startDate: '',
    endDate: '',
    status: '',
    weightage: 0,
  });

  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Assign To');
  const [getMembers, setGetMembers] = useState(true);
  const [userId, setUserId] = useState();
  const [formErrors, setFormErrors] = useState({
    title: '',
    description: '',
    deadline: '',
    weightage: '',
    assignTo: '',
  });

  const { invokeGetTasks } = useContext(AuthContext);

  const handleOptionChange = (eventKey) => {
    const Name = members
      .filter((item) => item.id === eventKey)
      .map((item) => item.userName);
    setUserId(eventKey);
    setSelectedOption(Name);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: '' });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm()) {
      const AddTaskURL = process.env.REACT_APP_ADD_TASK;
      const data = {
        title: formData.title,
        description: formData.description,
        deadline: formData.deadline,
        weightage: formData.weightage,
        user_id: userId,
        project_id: props.id,
      };
      axios
        .post(AddTaskURL, data)
        .then((result) => {
          invokeGetTasks(true);
          navigate('/ProjectDetails', {
            state: { id: props.id, title: props.title, description: props.description },
          });
        })
        .catch((error) => {
          console.log("NAANTHANDA " + error);
        });
      props.handleSubmit();
      console.log(AddTaskURL);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const errors = {};

    if (formData.title.trim() === '') {
      isValid = false;
      errors.title = 'Title is required';
    }

    if (formData.description.trim() === '') {
      isValid = false;
      errors.description = 'Description is required';
    }

    if (formData.deadline === '') {
      isValid = false;
      errors.deadline = 'Deadline is required';
    } else {
      const selectedDate = new Date(formData.deadline);
      const currentDate = new Date();
      currentDate.setHours(currentDate.getHours() + 3);
      if (selectedDate < currentDate) {
        isValid = false;
        errors.deadline = 'Deadline must be greater than or equal to today';
      }
    }

    if (formData.weightage <= 0 || formData.weightage > 10) {
      isValid = false;
      errors.weightage = 'Weightage must be between 1 and 10';
    }

    if (!userId) {
      isValid = false;
      errors.assignTo = 'Assign To is required';
    }

    setFormErrors(errors);
    return isValid;
  };

  const getUsersOfThisProject = async () => {
    const base_URL = process.env.REACT_APP_GET_USERS_FROM_PROJECT;
    try {
      const response = await axios.get(`${base_URL}${props.id}`);
      setMembers(response.data);
      console.log("in task success");
      console.log(members);
      setGetMembers(false);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getUsersOfThisProject();
  }, [getMembers]);

  return (
    <Container>
      <Row>
        <Col md={6}>
          <Form>
            <Form.Group controlId="title">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                isInvalid={formErrors.title !== ''}
              />
              <Form.Control.Feedback type="invalid">{formErrors.title}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="description">
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                isInvalid={formErrors.description !== ''}
              />
              <Form.Control.Feedback type="invalid">{formErrors.description}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="deadline">
              <Form.Label>Deadline:</Form.Label>
              <Form.Control
                type="datetime-local"
                name="deadline"
                value={formData.deadline}
                onChange={handleInputChange}
                isInvalid={formErrors.deadline !== ''}
              />
              <Form.Control.Feedback type="invalid">{formErrors.deadline}</Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="weightage">
              <Form.Label>Weightage:</Form.Label>
              <Form.Control
                type="number"
                name="weightage"
                value={formData.weightage}
                min={1}
                max={10}
                onChange={handleInputChange}
                isInvalid={formErrors.weightage !== ''}
              />
              <Form.Control.Feedback type="invalid">{formErrors.weightage}</Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Col>
        <Col md={6}>
          <Form>
            <Form.Group controlId="assignTo">
              <Dropdown onSelect={handleOptionChange}>
                <Dropdown.Toggle variant="dark" className="w-auto" id="dropdown-basic" isInvalid={formErrors.assignTo !== ''}>
                  {selectedOption}
                </Dropdown.Toggle>
                <Dropdown.Menu className="dropdown">
                  {members.length ? (
                    members.map((item) => (
                      <Dropdown.Item key={item.id} eventKey={item.id}>
                        {item.userName.toString()}
                      </Dropdown.Item>
                    ))
                  ) : (
                    <Dropdown.Item disabled>No members in this project</Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control.Feedback type="invalid">{formErrors.assignTo}</Form.Control.Feedback>
            </Form.Group>
            <Button style={{ backgroundColor: '#9f5298' }} type="submit" onClick={handleSubmit}>
              Assign <FontAwesomeIcon icon={faTasks} />
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddTask;
