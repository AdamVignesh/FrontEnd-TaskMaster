import React from 'react'
import { FormControl, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate } from 'react-router-dom';

function TopBar(props) {

    const navigate = useNavigate();
  
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
  <Container>
    <Navbar.Brand href="">
      <img
        src="logo.png"
        alt="Logo"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      Task Master
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="me-auto">
        <Nav.Link onClick={()=>navigate("/Test")}>Dashboard</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
      </Nav>
      <Nav>
        <Nav.Link href="#deets">More deets</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
      <InputGroup style={{width:"200px"}} className="ms-lg-3">
          <FormControl type="text" placeholder="Search projects" style={{borderRadius:"30px"}} />
      </InputGroup>
      <NavDropdown title={<img src={props.imageUrl} alt="Dropdown" height="20" />} id="collasible-nav-dropdown">
          <NavDropdown.Item onClick={()=>props.onClick()}>Log Out</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#action/3.4">
            Separated link
          </NavDropdown.Item>
        </NavDropdown>
    </Navbar.Collapse>
  </Container>
</Navbar>

  )
}

export default TopBar