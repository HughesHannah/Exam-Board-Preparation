import React, {useState, useEffect} from "react";
import { variables } from "../../Variables.js";
import "./widget.scss";

import PeopleIcon from "@mui/icons-material/People";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Widget = ({ type }) => {
  let data;

  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    fetch(variables.API_URL + "studentAPI")
      .then((data) => data.json())
      .then((data) => setStudentData(data));
  }, []);

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI")
      .then((data) => data.json())
      .then((data) => setCourseData(data));
  }, []);

  //temp until retrieved data
  const studentCount = studentData.length;
  const courseCount = courseData.length;
  const preponderanceCount = 0;
  const issuesCount = 0;

  switch (type) {
    case "studentCounter":
      data = {
        title: "Students",
        link: "See student list",
        icon: <PeopleIcon className="icon" />,
        value: studentCount,
      };
      break;
    default:
      break;
    case "completedCourseCounter":
      data = {
        title: "Courses",
        link: "See course list",
        icon: <HistoryEduIcon className="icon" />,
        value: courseCount,
      };
      break;
    case "preponderanceCounter":
      data = {
        title: "Students with Preponderance",
        link: "N/A",
        icon: <NotificationsNoneIcon className="icon" />,
        value: preponderanceCount,
      };
      break;
    case "issueCounter":
      data = {
        title: "Potential Issues",
        link: "N/A",
        icon: <WarningAmberIcon className="icon" />,
        value: issuesCount,
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
