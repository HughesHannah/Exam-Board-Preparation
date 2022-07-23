import React, {useState, useEffect} from "react";
import "./single.scss";
import { variables } from "../../Variables";
import { useParams } from 'react-router-dom';

import Sidebar from "../../components/sidebar/Sidebar.js";
import DataTable from "../../components/dataTables/DataTable.js";
import GradesPieChartExample from "../../components/featured/GradesPieChart.js"
import ScatterChartExample from "../../components/chart/Scatter.js";

const SingleCourse = () => {
  const [courseData, setCourseData] = useState([]);

  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI/"+path.year+"/" + path.courseID)
      .then((data) => data.json())
      .then((data) => setCourseData(data))
  }, []);


    console.log(courseData);
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
                <span className="itemValue">COUNT</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Average Grade:</span>
                <span className="itemValue">CALCULATE</span>
              </div>
            </div>
          </div>
          <div className="right">
            <h1 className="title">Comments</h1>
            Lecturer Comments here..
          </div>
        </div>
        <div className="middle">
          <div className="left">
            <h1 className="title">Grade Distribution</h1>
            <GradesPieChartExample />
          </div>
          <div className="right">
            <h1 className="title">Scatter Chart</h1>
            <ScatterChartExample />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Student Grades</h1>
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
