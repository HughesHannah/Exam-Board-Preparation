import React, {useState} from "react";
import "./upload.scss";
import axios from "axios";

import {variables} from "../../Variables.js"
import Sidebar from "../../components/sidebar/Sidebar.js";

const Upload = () => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const [selectedFile, setSelectedFile] = useState();
  

	const handleSubmission = async (e) => {
    e.preventDefault();
    setStatus(""); // Reset status
    const formData = new FormData();
    formData.append("file", file);
    const resp = axios.post(variables.API_URL + "uploader", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    setStatus(resp.status === 200 ? "Thank you!" : "Error.");
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
          <div>
            <button onClick={handleSubmission} disabled={!(file)}>Submit</button>
            {status ? <h1>{status}</h1> : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
