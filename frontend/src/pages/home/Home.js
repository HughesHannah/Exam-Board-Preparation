import React, { useContext, useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import "./home.scss";
import AuthContext from "../../context/AuthContext.js";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from '@mui/icons-material/Close';

import Sidebar from "../../components/sidebar/Sidebar.js";
import Widget from "../../components/widget/Widget.js";
import Featured from "../../components/featured/Featured.js";
import Chart from "../../components/chart/Chart.js";
import StudentSearchTable from "../../components/table/StudentSearchTable.js";
import CourseSearchTable from "../../components/table/CourseSearchTable.js";


const Home = () => {
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [search, setSearch] = useState(null);
  let { user, authTokens, logoutUser } = useContext(AuthContext);

  const studentKeys = ["name", "metriculationNumber"];
  const courseKeys = ["classCode", "className"];

  const searchStudents = (data) => {
    return data.filter((item) =>
      studentKeys.some((studentKey) =>
        item[studentKey].toLowerCase().includes(search)
      )
    );
  };

  const searchCourses = (data) => {
    return data.filter((item) =>
      courseKeys.some((courseKey) =>
        item[courseKey].toLowerCase().includes(search)
      )
    );
  };


  let fetchStudents = async () => {
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

  useEffect(() => {
    
    fetchStudents();
    const fetchCourses = async () => {
      const res = await fetch(variables.API_URL + "courseAPI")
        .then((data) => data.json())
        .then((data) => setCourseData(data));
    };
    fetchCourses();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="studentCounter" />
          <Widget type="completedCourseCounter" />
          <Widget type="preponderanceCounter" />
          <Widget type="issueCounter" />
        </div>
        <div className="searchdiv">
          <div className="search">
            <SearchIcon className="searchIcon" />
            <input
              className="searchBox"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch((e.target.value).toLowerCase())}
            />
            <CloseIcon className="closeIcon" onClick={() => setSearch(null)}/>
          </div>
        </div>
        <div className="searchResults">
          <StudentSearchTable data={searchStudents(studentData)} />
          <CourseSearchTable data={searchCourses(courseData)} />
        </div>
        <div className="charts">
          <div className="pieChart">
            <Featured />
          </div>
          <div className="lineChart">
            <Chart />
          </div>
        </div>
        <div className="table"></div>
      </div>
    </div>
  );
};

export default Home;
