import React, { useContext, useState } from 'react'

import './SideBar.css'
import { AuthContext } from '../../MyContext';
import { FormControl, InputGroup } from 'react-bootstrap';

function SideBar(props) {

  const {loggedInUser,isSignedIn,invokeStateUpdate} = useContext(AuthContext);

  const handleAddProject = ()=>{
    props.handleAddProjectClick();
  }

  

  return (
    <div className="sidebar">
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
              <InputGroup className="me-auto searchBar">
                <FormControl type="text" onChange={props.searchChange} placeholder="Search projects" style={{borderRadius:"30px"}} />
              </InputGroup>
           
              </li>
              <li className="sidebar-menu-item">
                {/* <FaChartBar className="sidebar-menu-icon" /> */}
                <p>Dashboard</p>
              </li>
              <li className="sidebar-menu-item">
                {/* <FaUser className="sidebar-menu-icon" /> */}
                <p>Dashboard</p>
              </li>
              {loggedInUser?.role=="Manager"? 
              <li  className="sidebar-menu-item">
                {/* <FaCog className="sidebar-menu-icon" /> */}
                <button onClick={handleAddProject}>Add Project</button>
              </li>:null}
              <li className="sidebar-menu-item">
              <button onClick={()=>props.onClick()}>Log Out</button>
              </li>
              
            </ul>
          </div>
  )
}

export default SideBar