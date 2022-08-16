import React, {useContext} from "react";
import "./sidebar.scss";

import DashboardIcon from "@mui/icons-material/Dashboard";
import SchoolIcon from "@mui/icons-material/School";
import GroupIcon from "@mui/icons-material/Group";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import GavelIcon from '@mui/icons-material/Gavel';

import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext.js";

const Sidebar = () => {
  let {user, logoutUser} = useContext(AuthContext)
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
              <GavelIcon className="icon" />
              <span>Grading</span>
            </li>
          </Link>
          <Link to="/students" style={{ textDecoration: "none" }}>
            <li>
              <GroupIcon className="icon" />
              <span>Students</span>
            </li>
          </Link>

          {/* FUTURE WORK: Link to current year - for this project only considering one year */}
          <Link to="/courses/2021-2022" style={{ textDecoration: "none" }}>
            <li>
              <HistoryEduIcon className="icon" />
              <span>Courses</span>
            </li>
          </Link>

          {/* FUTURE WORK: Only show this to users who manage students in an exit year */}
          <Link to="/classification/Computing%20Science" style={{ textDecoration: "none" }}>
            <li>
              <SchoolIcon className="icon" />
              <span>Classification</span>
            </li>
          </Link>

          <p className="title">SYSTEM</p>
          <Link to="/upload" style={{ textDecoration: "none" }}>
            <li>
              <UploadFileIcon className="icon" />
              <span>Upload Data</span>
            </li>
          </Link>
          

          <p className="title">USER</p>
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <li>
              <AccountBoxIcon className="icon" />
              <span>User Profile</span>
            </li>
          </Link>
          
            <li onClick={logoutUser}>
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </li>
          
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
