import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { variables } from "../../Variables.js";
import "./preponderance.scss";

const Preponderance = ({ gradeData, courseData }) => {
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedCourseYearStart, setSelectedCourseYearStart] = useState(null);
  const [filteredAssignments, setFilteredAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [selectedPreponderance, setSelectedPreponderance] = useState(null);
  const path = useParams();

  const handlePreponderanceSubmission = async (e) => {
    const formData = new FormData();
    formData.append("course", selectedCourse);
    formData.append("courseYearStart", selectedCourseYearStart);
    formData.append("assignment", selectedAssignment);
    formData.append("preponderance", selectedPreponderance);
    let response;

    try {
      response = axios.post(
        variables.API_URL + "preponderanceAPI/" + path.studentID,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
        }
      );
      alert("Preponderance applied");
      location.reload();
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    setFilteredAssignments(
      gradeData.filter((item) => item.course.className == selectedCourse)
    );
    if (selectedCourse) {
      setSelectedCourseYearStart(
        courseData.find((course) => course.className == selectedCourse).year
          .yearStart
      );
    }
  }, [selectedCourse]);

  function getFilteredAssignments() {
    if (filteredAssignments.length == 0) {
      return;
    } else
      return filteredAssignments.map((work) => (
        <option key={work.name} value={work.name}>
          {work.name}
        </option>
      ));
  }

  return (
    <div>
      <div>
        <div className="formInput">
          <p>Course</p>
          <div className="input">
            <select
              id="Course"
              name="Course"
              onChange={(e) => setSelectedCourse(e.target.value)}
            >
              <option disabled selected hidden>Please Select</option>
              {courseData.map((course) => (
                <option key={course.className} value={course.className}>
                  {course.className}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="formInput">
          <p>Assessment</p>
          <div className="input">
            <select
              id="Course"
              name="Course"
              disabled={selectedCourse==null}
              onChange={(e) => setSelectedAssignment(e.target.value)}
            >
              <option disabled selected hidden>Please Select</option>
              {getFilteredAssignments()}
            </select>
          </div>
        </div>
        <div className="formInput">
          <p>Preponderance</p>
          <div className="input">
            <select
              id="Preponderance"
              name="Preponderance"
              disabled={selectedCourse==null || selectedAssignment==null}
              onChange={(e) => setSelectedPreponderance(e.target.value)}
            >
              <option value="NA">None</option>
              <option value="MV">Medical Void</option>
              <option value="CW">Credit Witheld</option>
              <option value="CR">Credit Refused</option>
            </select>
          </div>
        </div>
        <div className="button">
          <button
            onClick={handlePreponderanceSubmission}
            disabled={
              !selectedCourse && !selectedAssignment && !selectedPreponderance
            }
          >
            Add Preponderance
          </button>
        </div>
      </div>
    </div>
  );
};

export default Preponderance;
