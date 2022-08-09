import React, { useState, useEffect } from "react";
import "./single.scss";
import { variables } from "../../Variables";
import { averageGrade } from "../../utils/GradeConversion.js";
import { useParams } from "react-router-dom";
import axios from "axios";

import Sidebar from "../../components/sidebar/Sidebar.js";
import StudentsInCourseTable from "../../components/dataTables/StudentsInCourseTable.js";
import CourseGradesPieChart from "../../components/chart/CourseGradesPieChart.js";
import ScatterChartExample from "../../components/chart/Scatter.js";
import TableSkeleton from "../../components/skeletons/TableSkeleton.js";
import PieChartSkeleton from "../../components/skeletons/PieChartSkeleton.js";
import ScatterChartSkeleton from "../../components/skeletons/ScatterChartSkeleton.js";

const SingleCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [isModerated, setIsModerated] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState();
  const [works, setWorks] = useState([]);
  const [modifiedWorks, setModifiedWorks] = useState([]);
  const [moderation, setModeration] = useState(1.0);

  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI/" + path.year + "/" + path.courseID)
      .then((data) => data.json())
      .then((data) => setCourseData(data));

    fetch(
      variables.API_URL +
        "courseAPI/" +
        path.year +
        "/" +
        path.courseID +
        "/students/grades"
    )
      .then((data) => data.json())
      .then((data) => setGradeData(data));
  }, []);

  useEffect(() => {
    console.log("inside use effect");
    if (gradeData.length != 0) {
      setWorks([
        ...new Set(gradeData[0].work_student.map((item) => item.name)),
      ]);

      gradeData[0].work_student.map((item) => {
        if (item.moderation > 1 || item.moderation < 1) {
          setModifiedWorks([...modifiedWorks, {name: item.name, moderation: item.moderation}]);
          setIsModerated(true);
        }
      });
    }
  }, [gradeData]);

  const handleWorkModerationSubmission = async (e) => {
    // e.preventDefault();
    const formData = new FormData();
    let response;

    if (selectedAssignment == "All") {
      formData.append("moderation", moderation);

      try {
        response = axios.post(
          variables.API_URL +
            "courseAPI/" +
            path.year +
            "/" +
            path.courseID +
            "/moderateAll",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        alert("moderation applied");
      } catch (error) {
        console.log(error.response.data);
      }
    } else {
      formData.append("work", selectedAssignment);
      formData.append("moderation", moderation);

      try {
        response = axios.post(
          variables.API_URL +
            "courseAPI/" +
            path.year +
            "/" +
            path.courseID +
            "/moderateWork",
          formData,
          {
            headers: {
              "content-type": "multipart/form-data",
            },
          }
        );
        alert("moderation applied");
      } catch (error) {
        console.log(error.response.data);
      }
    }
  };

  function getListOfModified() {
    if (modifiedWorks.length != 0) {
      return modifiedWorks.map((work) => (
        <li key={work} value={work}>
          {work.name} - {work.moderation}
        </li>
      ));
    } else {
      return <li>None</li>;
    }
  }

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
                <span className="itemValue">
                  {averageGrade(gradeData, "band")}
                </span>
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
            {gradeData.length == 0 ? (
              <PieChartSkeleton />
            ) : (
              <CourseGradesPieChart inputData={gradeData} />
            )}
          </div>
          <div className="right">
            <h1 className="title">Scatter Chart</h1>
            {gradeData.length == 0 ? (
              <ScatterChartSkeleton />
            ) : (
              <ScatterChartExample inputData={gradeData} />
            )}
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Student Grades</h1>
          {gradeData.length == 0 ? (
            <TableSkeleton />
          ) : (
            <StudentsInCourseTable inputGradeData={gradeData} />
          )}
        </div>
        <div className="moderation">
          <h1 className="title">Course Moderation</h1>
          <div>
            <p>Current Moderation:</p>
            <ul>
              {getListOfModified()}
            </ul>
          </div>
          <div>
            <p>Add Moderation:</p>
            <select
              id="Assignment"
              name="Assignment"
              onChange={(e) => setSelectedAssignment(e.target.value)}
            >
              <option>Please Select</option>
              <option value="All">All</option>
              {works.map((eachWork) => (
                <option key={eachWork} value={eachWork}>
                  {eachWork}
                </option>
              ))}
            </select>
            <p>Moderation:</p>
            <input
              type="number"
              step="any"
              onChange={(e) => setModeration(e.target.value)}
              value={moderation}
            />
            <button
              onClick={handleWorkModerationSubmission}
              disabled={!selectedAssignment && !moderation}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
