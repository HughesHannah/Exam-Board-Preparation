import React, { useState, useEffect } from "react";
import { variables } from "../../Variables.js";

import "./grading.scss";

import Sidebar from "../../components/sidebar/Sidebar.js";
import GradeTable from "../../components/table/GradeTable.js";
import ClassificationRulesTable from "../../components/table/ClassificationRulesTable";
import EditClassificationGrade from "./EditClassificationGrade.js";

const Grading = () => {
  const [classificationData, setClassificationData] = useState([]);
  const [editOpen, setEditOpen] = useState(true)

  const handleEditButtonClick = async (e) => {
    setEditOpen(!editOpen);
  };

  let fetchDegreeClassifications = async () => {
    let response = await fetch(variables.API_URL + "degreeClassificationAPI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setClassificationData(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  useEffect(() => {
    fetchDegreeClassifications();
  }, []);

  return (
    <div className="grading">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">Grading Rules</h3>

        <div className="classificationGrades">
          <div className="editButton" onClick={handleEditButtonClick}>Edit</div>
          <div className="titleOfSection">Classification Rules</div>
          {(editOpen && classificationData.length > 0)? <EditClassificationGrade classificationData={classificationData}/> : ""}
          <ClassificationRulesTable classifications={classificationData} />
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
