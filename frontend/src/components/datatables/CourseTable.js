import React, { useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const columns = [
  { field: "classCode", headerName: "Code", width: 200 },
  { field: "className", headerName: "Course Name", width: 200},
  { field: "credits", headerName: "Credits" },
  { field: "year", headerName: "Year", valueGetter: (params) => {return params.row.year.year}}
    // TODO add count of students?
];

const CourseTable = () => {
  const [tableData, setTableData] = useState([]);
  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI/"+path.year)
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
            <Link to={cellValues.row.classCode} style={{ textDecoration: "none" }}>
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
        pageSize={25}
        checkboxSelection
      />
    </div>
  );
};

export default CourseTable;
