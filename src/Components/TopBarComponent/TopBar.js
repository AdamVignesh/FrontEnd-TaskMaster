import React, { useContext } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

import { AuthContext } from '../../MyContext';
import './TopBar.css';


function TopBar(props) {

    const navigate = useNavigate();
    const {loggedInUser,showEndProject,showProjectsMenu,showDashBoardMenu,projectProgress} = useContext(AuthContext);
  
  return (
    <>
      {[ 'xxl'].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand>Task Master</Navbar.Brand>
            {showDashBoardMenu?<InputGroup className="me-auto searchBar">
              <FormControl
                type="text"
                onChange={props.searchChange}
                placeholder="Search projects"
                style={{ borderRadius: "30px" }}
              />
            </InputGroup>:null
              }
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body className="d-flex justify-content-center align-items-start">
                <Nav className="pe-3 d-flex justify-content-center align-items-center">
                  {<img src= {loggedInUser?.imgUrl} style={{height:"90px",width:"80px", borderRadius:"50px", marginBottom:"10px"}}/>} 
                  <h5>Hey, <span style={{color:"#9f5298"}}> {loggedInUser?.userName} </span> </h5>
                  {/* <Nav.Link href="#action1">Home</Nav.Link> */}
                  
                  {showProjectsMenu?<Button variant='primary' onClick={()=>{navigate("/Dashboard")}}>Dashboard</Button>:null}
                  {showProjectsMenu && loggedInUser?.role=='Manager'?<Button variant='primary' onClick={props.handleAddMembers}>Add Members</Button>:null}
                  {showProjectsMenu && loggedInUser?.role=='Manager'?<Button variant='primary' onClick={props.handleAddTask}>Assign Tasks</Button>:null}
                  {showProjectsMenu && loggedInUser?.role == 'Manager'&& showEndProject?<Button variant='primary' onClick={props.handleEndProject}>End Project</Button>:null}
                  
                  <Button variant='danger' onClick={props.handleLogOut}>
                      <FontAwesomeIcon icon={faSignOutAlt} />
                  </Button>
                  {/* <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else here
                    </NavDropdown.Item>
                  </NavDropdown> */}
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>

  )
}

export default TopBar