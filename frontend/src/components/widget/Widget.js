import React, { useContext, useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import { Link } from "react-router-dom";
import { useParams, useNavigate } from "react-router-dom";
import "./widget.scss";
import AuthContext from "../../context/AuthContext.js";
import {averageGrade} from "../../utils/GradeConversion.js";

import PeopleIcon from "@mui/icons-material/People";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';

const Widget = ({ type, data }) => {
  let widgetData;
  let { user, authTokens, logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [studentGrades, setStudentGrades] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [prepData, setPrepData] = useState([]);


  let getStudents = async () => {
    let response = await fetch(variables.API_URL + "studentAPI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setStudentData(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  let getPrep = async () => {
    let response = await fetch(variables.API_URL + "gradesAPI/Preponderance", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setPrepData(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  useEffect(() => {
    getStudents();
    getPrep();
  }, []);

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI")
      .then((data) => data.json())
      .then((data) => setCourseData(data));
  }, []);

  const studentCount = studentData.length;
  const courseCount = courseData.length;
  const preponderanceCount = prepData.length;
  const averageStudentGrade = averageGrade(data, "band");

  switch (type) {
    case "studentCounter":
      widgetData = {
        title: "Students",
        link: "/students",
        icon: <PeopleIcon className="icon" />,
        value: studentCount,
      };
      break;
    default:
      break;
    case "completedCourseCounter":
      widgetData = {
        title: "Courses",
        link: "/courses/2020-2021",
        icon: <HistoryEduIcon className="icon" />,
        value: courseCount,
      };
      break;
    case "preponderanceCounter":
      widgetData = {
        title: "Instances of Preponderance",
        link: "/",
        icon: <NotificationsNoneIcon className="icon" />,
        value: preponderanceCount,
      };
      break;
    case "issueCounter":
      widgetData = {
        title: "Average Grade",
        link: "/",
        icon: <DriveFileRenameOutlineIcon className="icon" />,
        value: averageStudentGrade,
      };
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="counter">{widgetData.value}</span>
        <span className="title">{widgetData.title}</span>
      </div>
      <div className="right">{widgetData.icon}</div>
    </div>
  );
};

export default Widget;
