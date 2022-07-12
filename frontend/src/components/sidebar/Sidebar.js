import React from 'react'
import "./sidebar.scss"

import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

import {Link} from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{textDecoration: 'none'}}>
          <span className="logo">Exam Board <br/>Preparation</span>
        </Link>
      </div>

      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{textDecoration: 'none'}}>
            <li>
              <DashboardIcon className="icon"/>
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/" style={{textDecoration: 'none'}}>
            <li>
              <SchoolIcon className="icon" />
              <span>Grading</span>
            </li>
          </Link>
          <Link to="/students" style={{textDecoration: 'none'}}>
            <li>
            <GroupIcon className="icon" />
            <span>Students</span>
          </li>
          </Link>
          <Link to="/courses" style={{textDecoration: 'none'}}>
            <li>
            <HistoryEduIcon className="icon" />
            <span>Courses</span>
          </li>
          </Link>
          
          <p className="title">SYSTEM</p>
          <Link to="/" style={{textDecoration: 'none'}}>
            <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          </Link>
          <Link to="/" style={{textDecoration: 'none'}}>
            <li>
            <AccountBoxIcon className="icon" />
            <span>User Profile</span>
          </li>
          </Link>
          <Link to="/" style={{textDecoration: 'none'}}>
            <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        other
      </div>
    </div>
  )
}

export default Sidebar