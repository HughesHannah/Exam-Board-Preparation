import React, { useContext, useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AuthContext from "../../context/AuthContext.js";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const defaultColumns = [
  { field: "metriculationNumber", headerName: "Metriculation" },
  { field: "classification", headerName: "Classification", width: 200 },
];

const StudentClassification = () => {
  const [degree, setDegree] = useState("all");
  const [studentData, setStudentData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [filteredData, setFilteredData] = useState(studentData);
  const [columns, setColumns] = useState(defaultColumns);
  let { authTokens, logoutUser } = useContext(AuthContext);

  let fetchStudents = async () => {
    let response = await fetch(variables.API_URL + "studentAPI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setStudentData(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  useEffect(() => {
    fetchStudents();
    setFilteredData(
      degree === "all"
        ? studentData
        : studentData.filter((dt) => dt.degreeTitle === degree)
    );
  }, [studentData, degree]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <div className="select">
        <Select
          id="select"
          style={{ width: 200 }}
          value={degree}
          onChange={(e) => {
            setDegree(e.target.value);
          }}
        >
          <MenuItem value={"Computing Science"}>Computing Science</MenuItem>
          <MenuItem value={"Software Engineering"}>
            Software Engineering
          </MenuItem>
          <MenuItem value={"all"}>All</MenuItem>
        </Select>
      </div>
      <DataGrid
        rows={filteredData}
        columns={columns}
        pageSize={50}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default StudentClassification;
