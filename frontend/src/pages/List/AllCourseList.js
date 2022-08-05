import React from "react";
import "./list.scss";

import AllCoursesTable from "../../components/datatables/AllCoursesTable.js";
import Sidebar from "../../components/sidebar/Sidebar.js";
import YearPicker from "../../components/picker/YearPicker.js";

const AllCourseList = () => {
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
          <AllCoursesTable />
        </div>
      </div>
    </div>
  );
};

export default AllCourseList;
