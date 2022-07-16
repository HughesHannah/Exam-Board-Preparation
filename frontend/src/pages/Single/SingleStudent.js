import React from "react";
import "./single.scss";

import Sidebar from "../../components/sidebar/Sidebar.js";
import Comments from "../../components/comments/Comments.js";
import DataTable from "../../components/dataTable/DataTable.js";

const SingleStudent = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="mainContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Student Information</h1>
            <div className="details">
              <h1 className="itemTitle">Metric: 1234567</h1>

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