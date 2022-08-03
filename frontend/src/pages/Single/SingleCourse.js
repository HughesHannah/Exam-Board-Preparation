import React, { useState, useEffect } from "react";
import "./single.scss";
import { variables } from "../../Variables";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar.js";
import StudentsInCourseTable from "../../components/dataTables/StudentsInCourseTable.js";
import GradesPieChart from "../../components/chart/GradesPieChart.js";
import ScatterChartExample from "../../components/chart/Scatter.js";

const SingleCourse = () => {
  const [courseData, setCourseData] = useState([]);

  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI/" + path.year + "/" + path.courseID)
      .then((data) => data.json())
      .then((data) => setCourseData(data));
  }, []);


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
                <span className="itemValue">CALCULATE</span>
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
            <GradesPieChart />
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
      </div>
    </div>
  );
};

export default SingleCourse;
