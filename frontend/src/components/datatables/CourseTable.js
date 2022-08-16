import React, { useState, useEffect } from "react";
import { variables, theme } from "../../Variables.js";
import { ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const columns = [
  { field: "classCode", headerName: "Code", width: 200 },
  { field: "className", headerName: "Course Name", width: 200 },
  { field: "credits", headerName: "Credits" },
  {
    field: "year",
    headerName: "Year",
    valueGetter: (params) => {
      return params.row.year.year;
    },
  },
];

const CourseTable = () => {
  const [tableData, setTableData] = useState([]);
  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "courseAPI/" + path.year)
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
            <Link
              to={cellValues.row.classCode}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <ThemeProvider theme={theme}>
        <DataGrid
          autoHeight
          {...tableData}
          rows={tableData}
          columns={columns.concat(actionColumn)}
          checkboxSelection
          rowsPerPageOptions={[10, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: { printOptions: { disableToolbarButton: true } },
          }}
        />
      </ThemeProvider>
    </div>
  );
};

export default CourseTable;
