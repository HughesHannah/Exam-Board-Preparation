import React from 'react'
import "./list.scss"

import Datatable from "../../components/datatable/Datatable.js";
import Sidebar from "../../components/sidebar/Sidebar.js";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">
          List of Courses
        </h3>
        <div className="tableOfGrades">
            <div className="titleOfSection">
                Table of Courses
            </div>
            <Datatable/>
        </div>
      </div>
    </div>
  )
}

export default List