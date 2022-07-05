import React from 'react'
import "./sidebar.scss"

import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import GroupIcon from '@mui/icons-material/Group';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LogoutIcon from '@mui/icons-material/Logout';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Exam Board <br/>Preparation</span>
      </div>
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon"/>
            <span>Dashboard</span>
          </li>
          <li>
            <SchoolIcon className="icon" />
            <span>Grading</span>
          </li>
          <li>
            <GroupIcon className="icon" />
            <span>Students</span>
          </li>
          <li>
            <HistoryEduIcon className="icon" />
            <span>Courses</span>
          </li>
          <p className="title">SYSTEM</p>
          <li>
            <NotificationsNoneIcon className="icon" />
            <span>Notifications</span>
          </li>
          <li>
            <AccountBoxIcon className="icon" />
            <span>User Profile</span>
          </li>
          <li>
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        other
      </div>
    </div>
  )
}

export default Sidebar