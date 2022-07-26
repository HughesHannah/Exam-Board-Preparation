import React, { useState, useEffect } from "react";
import "./upload.scss";
import axios from "axios";

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

  return (
    <div className="upload">
      <Sidebar />
      <div className="mainContainer">
        <div>
          <h1 className="title">Upload Page</h1>
        </div>
        <div className="form">
          <h3>Upload Students</h3>
          <div className="formInput">
            <p>File to Upload:</p>
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div>
            <button onClick={handleStudentSubmission} disabled={!file}>
              Submit
            </button>
          </div>
        </div>
        <div className="form">
          <h3>Upload Courses</h3>
          <div className="formInput">
            <p>File to Upload:</p>
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="formInput">
            <p>Year</p>
            <select id="Year" name="Years" onChange={(e) => setYear(e.target.value)}>
              <option>Please Select</option>
              {years.map((eachYear) => (
                <option key={eachYear.id} value={eachYear.year}>
                  {eachYear.year}
                </option>
              ))}
            </select>
          </div>
          <div>
            <button onClick={handleCourseSubmission} disabled={!file}>
              Submit
            </button>
          </div>
        </div>
        <div className="form">
          <h3>Upload Students to Courses</h3>
          <div className="formInput">
            <p>File to Upload:</p>
            <input
              type="file"
              name="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
          <div className="formInput">
            <p>Level:</p>
            <input
              type="number"
              onChange={(e) => setLevel(e.target.value)}
              value={level}
            />
          </div>
          <div className="formInput">
            <p>Course Year</p>
            <select id="Year" name="Years" onChange={(e) => setYear(e.target.value)}>
              <option>Please Select</option>
              {years.map((eachYear) => (
                <option key={eachYear.id} value={eachYear.year}>
                  {eachYear.year}
                </option>
              ))}
            </select>
          </div>
          <div className="formInput">
            <button onClick={handleSubmission} disabled={!file}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
