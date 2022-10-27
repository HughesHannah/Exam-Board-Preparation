import React, { useState } from "react";
import axios from "axios";
import { variables } from "../../Variables.js";
import { useParams } from "react-router-dom";
import "./moderation.scss"

function getListOfModified(modifiedWorks) {
  if (modifiedWorks.length != 0) {
    return modifiedWorks.map((work) => (
      <li key={work} value={work}>
        {work.name} is moderated by {work.moderation}
      </li>
    ));
  } else {
    return <li>None</li>;
  }
}


const Moderation = ({modifiedWorks, works}) => {
  const [selectedAssignment, setSelectedAssignment] = useState();
  const [moderation, setModeration] = useState(1.0);

  const path = useParams();

  const handleWorkModerationSubmission = async (e) => {
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
    location.reload();
  };

  return (
    <div className="moderation">
      <div className="currentModeration">
        <p>Current Moderation:</p>
        <ul>{getListOfModified(modifiedWorks)}</ul>
      </div>
      <div className="formInput">
        <div className="input">
        <p>Add Moderation to coursework:</p>
        <select
          className="inputBox"
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
        </select></div><div className="input">
        <p>Moderation:</p>
        <input
          className="inputBox"
          type="number"
          step="any"
          onChange={(e) => setModeration(e.target.value)}
          value={moderation}
        /></div>
        <div className="buttonDiv">
        <button
          className="button"
          onClick={handleWorkModerationSubmission}
          disabled={!selectedAssignment && !moderation}
        >
          Submit
        </button></div>
      </div>
    </div>
  );
};

export default Moderation;
