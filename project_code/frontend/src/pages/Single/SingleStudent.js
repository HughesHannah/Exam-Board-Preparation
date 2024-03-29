import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables";
import { studentAverageGrade } from "../../utils/GradeConversion.js";
import { useParams } from "react-router-dom";

import "./single.scss";

import Sidebar from "../../components/sidebar/Sidebar.js";
import Comments from "../../components/comments/Comments.js";
import AddComment from "../../components/comments/AddComment.js";
import CoursesInStudentTable from "../../components/datatables/CoursesInStudentTable.js";
import Preponderance from "../../components/preponderance/Preponderance.js";
import TableSkeleton from "../../components/skeletons/TableSkeleton.js";
import ModerationSkeleton from "../../components/skeletons/ModerationSkeleton.js";

const SingleStudent = () => {
  const [studentData, setStudentData] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [commentOpen, setCommentOpen] = useState(false);

  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "individualStudentAPI/" + path.studentID)
      .then((data) => data.json())
      .then((data) => setStudentData(data));

    fetch(variables.API_URL + "studentCoursesAPI/" + path.studentID)
      .then((data) => data.json())
      .then((data) => setCourseData(data));

    fetch(variables.API_URL + "studentCoursesAPI/" + path.studentID + "/grades")
      .then((data) => data.json())
      .then((data) => setGradeData(data));
  }, []);

  const handleAddCommentClick = async (e) => {
    setCommentOpen(!commentOpen);
  };

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
                <span className="itemValue">
                  {studentData.length != 0 ? studentData.exitYear.year : ""}
                </span>
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
                <span className="itemValue">
                  {gradeData.length > 0
                    ? studentAverageGrade(gradeData, "band")
                    : ""}
                </span>
              </div>
            </div>
          </div>
          <div className="right">
            <div className="editButton" onClick={handleAddCommentClick}>
              Add Comment
            </div>
            <h1 className="title">Comments</h1>
            {commentOpen ? <AddComment /> : ""}
            <Comments />
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Student Grades</h1>
          <div>
          {(gradeData.length == 0 || courseData.length == 0)? (
            <TableSkeleton />
          ) : (
            <CoursesInStudentTable
              courseData={courseData}
              gradeData={gradeData}
            />
          )}
          </div>
        </div>
        <div className="preponderanceSection">
          
          <h3>Student Preponderance</h3>
          {gradeData.length == 0 ? (
            <ModerationSkeleton /> // just using moderation skeleton because its similar
          ) : (
            <Preponderance gradeData={gradeData} courseData={courseData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
