import React from "react";
import Sidebar from "../../components/sidebar/Sidebar.js";
import StudentClassification from "../../components/datatables/StudentClassification.js";
import "./classification.scss";


const Classification = () => {
  return (
    <div className="classification">
      <Sidebar />
      <div className="mainContainer">
      <h3 className="title">Degree Classifications</h3>
        <div className="tableOfStudents">
            <h3 className="sectionTitle">Table of Students</h3>
            <StudentClassification />
        </div>
      </div>
    </div>
  );
};

export default Classification;
