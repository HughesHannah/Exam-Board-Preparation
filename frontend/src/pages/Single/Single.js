import React from 'react'
import "./single.scss"

import Sidebar from "../../components/sidebar/Sidebar.js";
import Chart from "../../components/chart/Chart.js";
import DataTable from "../../components/dataTable/DataTable.js";

const Single = () => {
  return (
    <div className="single">
      <Sidebar />
      <div className="mainContainer">
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
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
            <Chart/>
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

export default Single