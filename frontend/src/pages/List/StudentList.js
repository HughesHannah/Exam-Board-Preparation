import React from "react";
import "./list.scss";

import StudentTable from "../../components/StudentTable/StudentTable";
import Sidebar from "../../components/sidebar/Sidebar.js";
import Chip from "../../components/chip/Chip.js";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">List of Students</h3>
        <div className="tableOfGrades">
          <div className="titleOfSection">Table of Students</div>
          <div className="filterChips">
            <Chip />
          </div>
          <StudentTable />
        </div>
      </div>
    </div>
  );
};

export default List;
