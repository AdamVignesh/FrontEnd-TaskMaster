import React from 'react'

import './SideBar.css'

function SideBar() {
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
              <li className="sidebar-menu-item">
                {/* <FaCog className="sidebar-menu-icon" /> */}
                <p>Dashboard</p>
              </li>
            </ul>
          </div>
  )
}

export default SideBar