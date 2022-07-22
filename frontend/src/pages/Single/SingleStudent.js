import React, {useState, useEffect} from "react";
import { variables } from "../../Variables";
import { useParams } from 'react-router-dom';

import "./single.scss";

import Sidebar from "../../components/sidebar/Sidebar.js";
import Comments from "../../components/comments/Comments.js";
import DataTable from "../../components/dataTables/DataTable.js";

const SingleStudent = ({id}) => {
  const [studentData, setStudentData] = useState([]);

  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "individualStudentAPI/"+path.studentID)
      .then((data) => data.json())
      .then((data) => setStudentData(data));
  }, []);



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
                <span className="itemValue">{studentData.metriculationNumber}</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Year:</span>
                <span className="itemValue">5</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Degree:</span>
                <span className="itemValue">Software Development</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Average Grade:</span>
                <span className="itemValue">A5</span>
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
          <DataTable />
        </div>
      </div>
    </div>
  );
};

export default SingleStudent;
