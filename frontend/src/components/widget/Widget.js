import React from "react";
import "./widget.scss";

import PeopleIcon from "@mui/icons-material/People";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Widget = ({ type }) => {
  let data;

  //temp until retrieved data
  const studentCount = 235;
  const courseCount = "31/45";
  const preponderanceCount = 5;
  const issuesCount = 2;

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
        title: "Completed Courses",
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
