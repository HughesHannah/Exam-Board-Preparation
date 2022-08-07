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

const Widget = ({ type }) => {
  let data;
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

  const fetchGrades = async () => {
    const res = await fetch(variables.API_URL + "studentAPI/grades", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
      .then((data) => data.json())
      .then((data) => setStudentGrades(data))
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
    fetchGrades();
  }, []);

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI")
      .then((data) => data.json())
      .then((data) => setCourseData(data));
  }, []);

  //temp until retrieved data
  const studentCount = studentData.length;
  const courseCount = courseData.length;
  const preponderanceCount = prepData.length;
  const issuesCount = 0;

  switch (type) {
    case "studentCounter":
      data = {
        title: "Students",
        link: "/students",
        icon: <PeopleIcon className="icon" />,
        value: studentCount,
      };
      break;
    default:
      break;
    case "completedCourseCounter":
      data = {
        title: "Courses",
        link: "/courses/2020-2021",
        icon: <HistoryEduIcon className="icon" />,
        value: courseCount,
      };
      break;
    case "preponderanceCounter":
      data = {
        title: "Instances of Preponderance",
        link: "/",
        icon: <NotificationsNoneIcon className="icon" />,
        value: preponderanceCount,
      };
      break;
    case "issueCounter":
      data = {
        title: "Average Grade",
        link: "/",
        icon: <DriveFileRenameOutlineIcon className="icon" />,
        value: averageGrade(studentGrades, "band"),
      };
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="counter">{data.value}</span>
        <span className="title">{data.title}</span>
      </div>
      <div className="right">{data.icon}</div>
    </div>
  );
};

export default Widget;
