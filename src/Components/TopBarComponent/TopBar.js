import React, { useContext } from 'react'
import { FormControl, InputGroup } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Navigate, useNavigate } from 'react-router-dom';
import debounce from 'lodash.debounce';

import { AuthContext } from '../../MyContext';
import './TopBar.css';


function TopBar(props) {

    const navigate = useNavigate();
    const {loggedInUser,isSignedIn,invokeStateUpdate} = useContext(AuthContext);
  
  return (
    <Navbar collapseOnSelect expand="lg" id='navb' className='sticky-top'>
  <Container>
    <Navbar.Brand className='brandName' href="">
      <img
        src="logo.png"
        alt="Logo"
        height="30"
        className="d-inline-block align-top"
      />{' '}
      TASK MASTER
    </Navbar.Brand>
    <Nav>
          <h5>Hey {props.name}</h5>
          <img src={props.imageUrl} alt={props.name} height="40"width="40" style={{borderRadius:"50%"}}  id="collasible-nav-dropdown"/>
        
      </Nav>
    {/* <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav>
        <Nav.Link onClick={()=>navigate("/Dashboard")}>Dashboard</Nav.Link>
        <Nav.Link eventKey={2} href="#memes">
          Dank memes
        </Nav.Link>
      </Nav>
      
      <NavDropdown title={<img src={props.imageUrl} alt={props.name} height="40"width="40" style={{borderRadius:"50%"}} />} id="collasible-nav-dropdown">
          <NavDropdown.Item onClick={()=>props.onClick()}>Log Out</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Another action
          </NavDropdown.Item>
        </NavDropdown>
    </Navbar.Collapse> */}
  </Container>
</Navbar>

  )
}

export default TopBar