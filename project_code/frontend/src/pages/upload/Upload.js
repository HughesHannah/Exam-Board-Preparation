import React, { useState, useEffect } from "react";
import "./upload.scss";
import axios from "axios";
import "../../utils/main.scss";

import { variables } from "../../Variables.js";
import Sidebar from "../../components/sidebar/Sidebar.js";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState(0);
  const [year, setYear] = useState("");
  let [years, setYears] = useState([]);

  useEffect(() => {
    getYears();
  }, []);

  let getYears = async () => {
    let response = await fetch(variables.API_URL + "yearsAPI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setYears(data);
  };

  const handleSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("level", level);
    formData.append("year", year);

    let response;
    try {
      response = axios.post(variables.API_URL + "uploader", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      alert("file uploaded");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleCourseSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("year", year);

    let response;
    try {
      response = axios.post(variables.API_URL + "courseUploader", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      alert("file uploaded");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleStudentSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    let response;
    try {
      response = axios.post(variables.API_URL + "studentUploader", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      alert("file uploaded");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  const handleGradeSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);

    let response;
    try {
      response = axios.post(variables.API_URL + "gradeUploader", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      alert("file uploaded");
    } catch (error) {
      console.error(error.response.data);
    }
  };

  return (
    <div className="upload">
      <Sidebar />
      <div className="mainContainer">
        <div>
          <h1 className="title">Upload Page</h1>
        </div>
        <div className="notice">
          <h3>Notice</h3>
          <p>
            Since this page is almost certainly going to change in
            implementation,{" "}
          </p>
          <p>it is only for proof of concept and database testing purposes. </p>
          <b>Please do not consider this page during user testing.</b>
        </div>

        <div className="form blueBackground">
          <h3>Upload Students</h3>
          <div className="formInputThree">
            <p>File to Upload:</p>
            <input
              className="inputFile"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="buttonDiv">
            <button
              className="button"
              onClick={handleStudentSubmission}
              disabled={!file}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="form blueBackground">
          <h3>Upload Courses</h3>
          <div className="formInputThree">
            <p>File to Upload:</p>
            <input
              className="inputFile"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="formInputThree">
            <p>Year</p>
            <select
              className="inputBox"
              id="Year"
              name="Years"
              onChange={(e) => setYear(e.target.value)}
            >
              <option>Please Select</option>
              {years.map((eachYear) => (
                <option key={eachYear.id} value={eachYear.year}>
                  {eachYear.year}
                </option>
              ))}
            </select>
          </div>
          <div className="buttonDiv">
            <button
              className="button"
              onClick={handleCourseSubmission}
              disabled={!file}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="form blueBackground">
          <h3>Upload Students to Courses</h3>
          <div className="formInputThree">
            <p>File to Upload:</p>
            <input
              className="inputFile"
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="formInputThree">
            <p>Level:</p>
            <input
              className="inputBox"
              type="number"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            />
          </div>
          <div className="formInputThree">
            <p>Course Year</p>
            <div className="userInput"><select
              className="inputBox"
              id="Year"
              name="Years"
              onChange={(e) => setYear(e.target.value)}
            >
              <option>Please Select</option>
              {years.map((eachYear) => (
                <option key={eachYear.id} value={eachYear.year}>
                  {eachYear.year}
                </option>
              ))}
            </select></div>
          </div>
          <div className="buttonDiv">
            <button
              className="button"
              onClick={handleSubmission}
              disabled={!file}
            >
              Submit
            </button>
          </div>
        </div>
        <div className="form blueBackground">
          <h3>Upload Grades</h3>
          <div className="formInputThree">
            <div className="uploadTitle">
              <p>File to Upload:</p>
            </div>
            <div className="userInput">
              <input
                className="inputFile"
                type="file"
                name="file"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>
          <div className="buttonDiv">
            <button
              className="button"
              onClick={handleGradeSubmission}
              disabled={!file}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
