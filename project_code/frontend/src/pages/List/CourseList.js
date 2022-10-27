import React from "react";
import "./list.scss";

import CourseTable from "../../components/datatables/CourseTable.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import YearPicker from "../../components/picker/YearPicker.js";

const CourseList = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">List of Courses</h3>
        <div className="tableOfGrades">
          <div className="titleOfSection">Table of Courses</div>
          <div className="yearSelection">
            <YearPicker />
          </div>
          <CourseTable />
        </div>
      </div>
    </div>
  );
};

export default CourseList;
