import React, { useContext, useState } from 'react';
import './SideBar.css';
import { AuthContext } from '../../MyContext';
import { FormControl, InputGroup } from 'react-bootstrap';

function SideBar(props) {
  const { loggedInUser, isSignedIn, invokeStateUpdate } = useContext(AuthContext);
  const [isExpanded, setIsExpanded] = useState(true);

  const handleAddProject = () => {
    props.handleAddProjectClick();
  };

  const handleToggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : 'collapsed'}`}>
      <button className="sidebar-toggle" onClick={handleToggleSidebar}>
        Toggle Sidebar
      </button>
      {isExpanded && (
        <ul className="sidebar-menu">
          <li className="sidebar-menu-item">
            <InputGroup className="me-auto searchBar">
              <FormControl
                type="text"
                onChange={props.searchChange}
                placeholder="Search projects"
                style={{ borderRadius: "30px" }}
              />
            </InputGroup>
          </li>
          <li className="sidebar-menu-item">
            <p>Dashboard</p>
          </li>
          <li className="sidebar-menu-item">
            <p>Dashboard</p>
          </li>
          {loggedInUser?.role === "Manager" && (
            <li className="sidebar-menu-item">
              <button onClick={handleAddProject}>Add Project</button>
            </li>
          )}
          <li className="sidebar-menu-item">
            <button onClick={() => props.onClick()}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default SideBar;
