import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables";
import { studentAverageGrade } from "../../utils/GradeConversion.js";
import { useParams } from "react-router-dom";

import "./single.scss";

import Sidebar from "../../components/sidebar/Sidebar.js";
import Comments from "../../components/comments/Comments.js";
import CoursesInStudentTable from "../../components/datatables/CoursesInStudentTable.js";
import Preponderance from "../../components/preponderance/Preponderance.js";
import TableSkeleton from "../../components/skeletons/TableSkeleton.js";
import ModerationSkeleton from "../../components/skeletons/ModerationSkeleton.js";

const SingleStudent = () => {
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [error, setError] = useState(null);
  const path = useParams();

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        variables.API_URL + "individualStudentAPI/" + path.studentID
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      setError(error.message);
    }

    try {
      const response = await fetch(
        variables.API_URL + "studentCoursesAPI/" + path.studentID
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      setError(error.message);
    }
    try {
      const response2 = await fetch(
        variables.API_URL + "studentCoursesAPI/" + path.studentID + "/grades"
      );
      if (!response2.ok) {
        throw new Error("Something went wrong!");
      }
      const data2 = await response2.json();
      setGradeData(data2);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);


  return (
    <div className="single">
      <Sidebar />
      <div className="mainContainer">
        <div className="top">
          <div className="left">
            <h1 className="title">Student Information</h1>
            <div className="details">
              <h1 className="itemTitle">{studentData.name}</h1>
              <div className="detailItem">
                <span className="itemKey">Metric:</span>
                <span className="itemValue">
                  {studentData.matriculationNumber}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Exit Year:</span>
                <span className="itemValue">{studentData.length != 0? studentData.exitYear.year:""}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Degree:</span>
                <span className="itemValue">
                  {studentData.mastersStudent ? "MSci " : "BSc "}
                  {studentData.degreeTitle}
                  {studentData.fastRouteStudent ? " FR" : ""}
                </span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Average Grade:</span>
                <span className="itemValue">{gradeData.length>0?studentAverageGrade(gradeData, "band"):""}</span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="editButton">Add Comment</div>
            <h1 className="title">Comments</h1>
            <Comments />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Student Grades</h1>
          {gradeData.length == 0 ? (
            <TableSkeleton />
          ) : (
            <CoursesInStudentTable
            courseData={courseData}
            gradeData={gradeData}
          />
          )}
        </div>
        <div className="preponderanceSection">
          <h1 className="title">Student Preponderance</h1>
          {gradeData.length == 0 ? (
            <ModerationSkeleton /> // just using moderation skeleton because its similar
          ) : (
            <Preponderance gradeData={gradeData} courseData={courseData}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
