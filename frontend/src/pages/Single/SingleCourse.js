import React from 'react'
import "./single.scss"

import Sidebar from "../../components/sidebar/Sidebar.js";
import DataTable from "../../components/dataTable/DataTable.js";

const SingleCourse = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="mainContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Course Information</h1>
            <div className="details">
              <h1 className="itemTitle">Course Name</h1>
            
              <div className="detailItem">
                <span className="itemKey">Code:</span>
                <span className="itemValue">COMPSCI1234</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Credits:</span>
                <span className="itemValue">20</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Number of Students:</span>
                <span className="itemValue">122</span>
              </div>
              <div className="detailItem">
                <span className="itemKey">Average Grade:</span>
                <span className="itemValue">A5</span>
              </div>
            </div>
          </div>
          <div className="right">
          <h1 className="title">Comments</h1>
            Lecturer Comments here.. 
          </div>
        </div>
        <div className="bottom">
          <h1 className="title">Student Grades</h1>
          <DataTable/>
        </div>
      </div>
    </div>
  )
}

export default SingleCourse