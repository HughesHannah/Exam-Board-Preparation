import React, {useState} from "react";
import "./upload.scss";
import axios from "axios";

import {variables} from "../../Variables.js"
import Sidebar from "../../components/sidebar/Sidebar.js";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [level, setLevel] = useState(0);
  

	const handleSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("level", level);
    // console.log(formData.get('level'));

    let response
    try{
       response = axios.post(variables.API_URL + "uploader", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      alert("file uploaded");
    }catch (error) {
      console.error(error.response.data);     // NOTE - use "error.response.data` (not "error")
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
          <h3>Upload Students and Courses</h3>
          <input type="file" name="file" onChange={(e) => setFile(e.target.files[0])} />
          <input type="number" onChange={(e) => setLevel(e.target.value)} value={level} />
          <div>
            <button onClick={handleSubmission} disabled={!(file)}>Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
