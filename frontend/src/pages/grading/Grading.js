import React from 'react'
import "./grading.scss"

import Sidebar from "../../components/sidebar/Sidebar.js";
import Table from "../../components/table/Table.js";

const Grading = () => {
  return (
    <div className="grading">
        <Sidebar />
      <div className="mainContainer">
        <div className="title">
            Grading Rules
        </div>
        <div className="tableOfGrades">
            <div className="editButton">Edit</div>
            <div className="titleOfSection">
                Table of Grades
            </div>
            <Table/>
        </div>
      </div>
    </div>
  )
}

export default Grading