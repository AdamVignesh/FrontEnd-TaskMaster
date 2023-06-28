import React, { useContext } from 'react'

import './SideBar.css'
import { AuthContext } from '../../MyContext';

function SideBar(props) {

  const {loggedInUser,isSignedIn,invokeStateUpdate} = useContext(AuthContext);

  const handleAddProject = ()=>{
    props.handleAddProjectClick();
  }

  return (
    <div className="sidebar">
            <ul className="sidebar-menu">
              <li className="sidebar-menu-item">
                {/* <FaHome className="sidebar-menu-icon" /> */}
                <p>Dashboard</p>
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
              
            </ul>
          </div>
  )
}

export default SideBar