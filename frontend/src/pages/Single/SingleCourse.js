import React, { useState, useEffect } from "react";
import "./single.scss";
import { variables } from "../../Variables";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar.js";
import StudentsInCourseTable from "../../components/dataTables/StudentsInCourseTable.js";
import CourseGradesPieChart from "../../components/chart/CourseGradesPieChart.js";
import ScatterChartExample from "../../components/chart/Scatter.js";
import {averageGrade} from "../../utils/GradeConversion.js";

const SingleCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([])
  const [isModerated, setIsModerated] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState()
  const [works, setWorks] = useState([]);
  const [moderation, setModeration] = useState(1.0);

  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI/" + path.year + "/" + path.courseID)
      .then((data) => data.json())
      .then((data) => setCourseData(data));

    fetch(variables.API_URL + "courseAPI/" + path.year + "/" + path.courseID + "/students/grades")
      .then((data) => data.json())
      .then((data) => setGradeData(data));  
  }, []);

  useEffect(() => {
    setWorks([...new Set(gradeData.map((item) => item.name))]);
  }, [gradeData])

  return (
    <div className="single">
      <Sidebar />
      <div className="mainContainer">
        <div className="top">
          <div className="left">
            <h1 className="title">Course Information</h1>
            <div className="details">
              <h1 className="itemTitle">{courseData.className}</h1>
              <div className="detailItem">
                <span className="itemKey">Code:</span>
                <span className="itemValue">{courseData.classCode}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Credits:</span>
                <span className="itemValue">{courseData.credits}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Number of Students:</span>
                <span className="itemValue">{courseData.students?.length}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Average Grade:</span>
                <span className="itemValue">{averageGrade(gradeData, "band")}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Moderated:</span>
                <span className="itemValue">{isModerated ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <h1 className="title">Lecturer Comments</h1>
            <p>{courseData.lecturerComments}</p>
          </div>
        </div>
        <div className="middle">
          <div className="left">
            <h1 className="title">Grade Distribution</h1>
            <CourseGradesPieChart />
          </div>
          <div className="right">
            <h1 className="title">Scatter Chart</h1>
            <ScatterChartExample />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Student Grades</h1>
          <StudentsInCourseTable />
        </div>
        <div className="moderation">
          <h1 className="title">Course Moderation</h1>
          <div>
            <p>Current Moderation:</p>
            <ul>
              <li>None</li>
            </ul>
          </div>
          <div>
            <p>
              Add Moderation:
            </p>
            <select id="Assignment" name="Assignment" onChange={(e) => setSelectedAssignment(e.target.value)}>
              <option>Please Select</option>
              {works.map((eachWork) => (
                <option key={eachWork} value={eachWork}>
                  {eachWork}
                </option>
              ))}
            </select>
            <p>Moderation:</p>
            <input
              type='number'
              step='any'
              onChange={(e) => setModeration(e.target.value)}
              value={moderation}
            />
            <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
