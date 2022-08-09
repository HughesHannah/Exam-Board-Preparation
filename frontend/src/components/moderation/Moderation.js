import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function getListOfModified(modifiedWorks) {
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
      <div>
        <p>Current Moderation:</p>
        <ul>{getListOfModified(modifiedWorks)}</ul>
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
  );
};

export default Moderation;
