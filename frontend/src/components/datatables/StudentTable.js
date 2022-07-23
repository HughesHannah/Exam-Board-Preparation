import React, { useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";

const columns = [
  { field: "metriculationNumber", headerName: "Metriculation" },
  { field: "name", headerName: "Student Name", width: 200},
  { field: "degreeTitle", headerName: "Degree", width: 200 },
  { field: "mastersStudent", headerName: "Masters?" },
  { field: "fastRouteStudent", headerName: "Fast Route?" },
  { field: "yearOfStudy", headerName: "Year" },
];

const StudentTable = () => {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    fetch(variables.API_URL + "studentAPI")
      .then((data) => data.json())
      .then((data) => setTableData(data));
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Link to={"/students/" + cellValues.row.metriculationNumber} style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={tableData}
        columns={columns.concat(actionColumn)}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
};

export default StudentTable;
