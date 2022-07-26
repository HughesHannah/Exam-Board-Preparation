import React from "react";
import "./list.scss";

import StudentTable from "../../components/datatables/StudentTable";
import Sidebar from "../../components/sidebar/Sidebar.js";


const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">List of Students</h3>
        <div className="tableOfGrades">
          <div className="titleOfSection">Table of Students</div>
          <StudentTable />
        </div>
      </div>
    </div>
  );
};

export default List;
