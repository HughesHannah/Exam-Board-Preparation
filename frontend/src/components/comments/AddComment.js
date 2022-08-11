import React, {useState, useEffect, useContext} from "react";
import { useParams } from "react-router-dom";
import { variables } from "../../Variables";
import AuthContext from "../../context/AuthContext.js";
import axios from "axios";
import './comments.scss';

const AddComment = () => {
    const [subjectLine, setSubjectLine] = useState(null);
    const [commentBody, setCommentBody] = useState(null);
    const path = useParams();
    let { authTokens, logoutUser } = useContext(AuthContext);

  const handleSubmission = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("subjectLine", subjectLine);
    formData.append("commentBody", commentBody);

    let response;
    try {
      response = axios.post(variables.API_URL + "addCommentAPI/" + path.studentID, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: "Bearer " + String(authTokens.access),
        },
      });
      alert("comment added");
    } catch (error) {
      console.error(error.response.data);
    }
    location.reload();
  };

  return (
    <div className="addComment">
      <h3>Add Comment</h3>
      <div className="formInput">
        <p>Subject Line:</p>
        <input
          type="text"
          name="subjectLine"
          onChange={(e) => setSubjectLine(e.target.value)}
        />
      </div>
      <div className="formInput">
        <p>Comment:</p>
        <input
          type="text"
          name="commentBody"
          onChange={(e) => setCommentBody(e.target.value)}
        />
      </div>
      <div>
        <button onClick={handleSubmission} disabled={!subjectLine && !commentBody}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AddComment;
