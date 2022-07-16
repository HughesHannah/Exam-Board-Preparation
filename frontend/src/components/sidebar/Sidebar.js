import React from "react";
import "./sidebar.scss";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">
            Exam Board <br />
            Preparation
          </span>
        </Link>
      </div>

      <div className="middle">
        <p>2021-2022</p>
      </div>

      <div className="bottom">
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/grading" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Grading</span>
            </li>
          </Link>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>
          <Link to="/courses" style={{ textDecoration: "none" }}>
            <li>
              <HistoryEduIcon className="icon" />
              <span>Courses</span>
            </li>
          </Link>

          <p className="title">SYSTEM</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <CalendarMonthIcon className="icon" />
              <span>Change Year</span>
            </li>
          </Link>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <FileDownloadIcon className="icon" />
              <span>Export Views</span>
            </li>
          </Link>

          <p className="title">USER</p>
          <Link to="/users/Profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountBoxIcon className="icon" />
              <span>User Profile</span>
            </li>
          </Link>
          <Link to="/logout" style={{ textDecoration: "none" }}>
            <li>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
