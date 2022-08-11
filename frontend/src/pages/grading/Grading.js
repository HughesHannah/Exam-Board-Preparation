import React from "react";
import "./grading.scss";

import Sidebar from "../../components/sidebar/Sidebar.js";
import GradeTable from "../../components/table/GradeTable.js";
import ClassificationRulesTable from "../../components/table/ClassificationRulesTable";

const Grading = () => {
  return (
    <div className="grading">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">Grading Rules</h3>

        <div className="classificationGrades">
          <div className="editButton">Edit</div>
          <div className="titleOfSection">Classification Rules</div>
          <ClassificationRulesTable />
        </div>

        <div className="tableOfGrades">
          <div className="titleOfSection">Table of Grades</div>
          <GradeTable />
        </div>
      </div>
    </div>
  );
};

export default Grading;
