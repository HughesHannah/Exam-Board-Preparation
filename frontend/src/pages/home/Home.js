import React, { useContext, useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import "./home.scss";
import AuthContext from "../../context/AuthContext.js";

import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";

import Sidebar from "../../components/sidebar/Sidebar.js";
import Widget from "../../components/widget/Widget.js";
import GradesPieChart from "../../components/chart/GradesPieChart.js";
import AverageGradeLineChart from "../../components/chart/AverageGradeLineChart.js";
import StudentSearchTable from "../../components/table/StudentSearchTable.js";
import CourseSearchTable from "../../components/table/CourseSearchTable.js";

const Home = () => {
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [studentGrades, setStudentGrades] = useState([]);
  const [search, setSearch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  let { authTokens, logoutUser } = useContext(AuthContext);

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

  const fetchCourses = async () => {
    const res = await fetch(variables.API_URL + "courseAPI")
      .then((data) => data.json())
      .then((data) => setCourseData(data));
  };

  const fetchGrades = async () => {
    // console.log(isLoading)
    const res = await fetch(variables.API_URL + "studentAPI/grades", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
      .then((data) => data.json())
      .then((data) => setStudentGrades(data))
      .then(setIsLoading(false))
      .then(console.log(studentGrades))
      
  };

  useEffect(() => {
    fetchStudents();
    fetchCourses();
    fetchGrades();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
         {(studentGrades.length == 0) ? (<p>Hi</p>): <Widget type="studentCounter" data={studentGrades}/>}
         {(studentGrades.length == 0) ? (<p>Hi</p>): <Widget type="completedCourseCounter" data={studentGrades}/>}
         {(studentGrades.length == 0) ? (<p>Hi</p>):<Widget type="preponderanceCounter" data={studentGrades}/>}
         {(studentGrades.length == 0) ? (<p>Hi</p>): <Widget type="issueCounter" data={studentGrades}/>}
        </div>
        <div className="searchdiv">
          <div className="search">
            <SearchIcon className="searchIcon" />
            <input
              className="searchBox"
              type="text"
              placeholder="Search..."
              onChange={(e) => setSearch(e.target.value.toLowerCase())}
            />
            <CloseIcon className="closeIcon" onClick={() => setSearch(null)} />
          </div>
        </div>
        <div className="searchResults">
          <StudentSearchTable data={searchStudents(studentData)} />
          <CourseSearchTable data={searchCourses(courseData)} />
        </div>
        <div className="charts">
          <div className="pieChart">
            <h1 className="title">
              Student Grades
            </h1>
            <div>
            {(studentGrades.length == 0) ? (<p>Loading</p>): <GradesPieChart inputData={studentGrades}/>}
              
            </div>
          </div>
          <div className="lineChart">
            <h1 className="title">
              Average Student Grade by Year
            </h1>
            <div>
              {(studentGrades.length == 0) ? (<p>Loading</p>): <AverageGradeLineChart inputData={studentGrades}/>}
            </div>
          </div>
        </div>
        <div className="table"></div>
      </div>
    </div>
  );
};

export default Home;
