import React, { useContext, useState, useEffect } from "react";
import { variables, theme } from "../../Variables.js";
import { ThemeProvider } from "@mui/material/styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AuthContext from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import "./datatable.scss";

const columns = [
  { field: "matriculationNumber", headerName: "Matriculation" },
  { field: "name", headerName: "Student Name", width: 200 },
  { field: "degreeTitle", headerName: "Degree", width: 200 },
  { field: "mastersStudent", headerName: "Masters?" },
  { field: "fastRouteStudent", headerName: "Fast Route?" },
];

const StudentTable = () => {
  const [degree, setDegree] = useState("all");
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData);
  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    setFilteredData(
      degree === "all"
        ? tableData
        : tableData.filter((dt) => dt.degreeTitle === degree)
    );
  }, [tableData, degree]);

  useEffect(() => {
    fetch(variables.API_URL + "studentAPI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
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
              to={"/students/" + cellValues.row.matriculationNumber}
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
      <div className="degreeSelect">
        <Select
          id="selectDegree"
          style={{ height: 40, width: 200 }}
          value={degree}
          onChange={(e) => {
            setDegree(e.target.value);
          }}
        >
          <MenuItem value={"Computing Science"}>Computing Science</MenuItem>
          <MenuItem value={"Software Engineering"}>
            Software Engineering
          </MenuItem>
          <MenuItem value={"all"}>All Degrees</MenuItem>
        </Select>
      </div>
      <div>
        <DataGrid
          autoHeight
          {...filteredData}
          rows={filteredData}
          columns={columns.concat(actionColumn)}
          checkboxSelection
          initialState={{
            pagination: {
              pageSize: 10,
            },
          }}
          rowsPerPageOptions={[10, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: { printOptions: { disableToolbarButton: true } },
          }}
        />
      </div></ThemeProvider>
    </div>
  );
};

export default StudentTable;
