import React, { useState, useEffect } from "react";
import "./single.scss";
import { variables } from "../../Variables";
import { averageGrade } from "../../utils/GradeConversion.js";
import { useParams } from "react-router-dom";

import Sidebar from "../../components/sidebar/Sidebar.js";
import StudentsInCourseTable from "../../components/dataTables/StudentsInCourseTable.js";
import CourseGradesPieChart from "../../components/chart/CourseGradesPieChart.js";
import ScatterChartExample from "../../components/chart/Scatter.js";
import TableSkeleton from "../../components/skeletons/TableSkeleton.js";
import PieChartSkeleton from "../../components/skeletons/PieChartSkeleton.js";
import ScatterChartSkeleton from "../../components/skeletons/ScatterChartSkeleton.js";
import Moderation from "../../components/moderation/Moderation.js";
import ModerationSkeleton from "../../components/skeletons/ModerationSkeleton.js";

const SingleCourse = () => {
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [isModerated, setIsModerated] = useState("");
  const [works, setWorks] = useState([]);
  const [modifiedWorks, setModifiedWorks] = useState([]);

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
    if (gradeData.length != 0) {
      setWorks([
        ...new Set(gradeData[0].work_student.map((item) => item.name)),
      ]);

      setIsModerated("No");
      gradeData[0].work_student.map((item) => {
        if (item.moderation > 1 || item.moderation < 1) {
          setModifiedWorks([
            ...modifiedWorks,
            { name: item.name, moderation: item.moderation },
          ]);
          setIsModerated("Yes");
        }
      });
    }
  }, [gradeData]);

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
                  {gradeData.length>0? averageGrade(gradeData, "band"):""}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Moderated:</span>
                <span className="itemValue">{isModerated}</span>
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
        <div className="moderationSection">
          <h3 className="moderationTitle">Course Moderation</h3>
          {gradeData.length == 0 ? (
            <ModerationSkeleton />
          ) : (
            <Moderation modifiedWorks={modifiedWorks} works={works} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
