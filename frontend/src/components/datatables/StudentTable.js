import React, { useContext, useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AuthContext from "../../context/AuthContext.js";
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import "./datatable.scss";

const columns = [
  { field: "metriculationNumber", headerName: "Metriculation" },
  { field: "name", headerName: "Student Name", width: 200 },
  { field: "degreeTitle", headerName: "Degree", width: 200 },
  { field: "mastersStudent", headerName: "Masters?" },
  { field: "fastRouteStudent", headerName: "Fast Route?" },
];

const StudentTable = () => {
  const [degree, setDegree] = useState('all');
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData)
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
      setTableData(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  useEffect(() => {
    fetchStudents();

    setFilteredData(degree === 'all' ? tableData: tableData.filter(dt=>dt.degreeTitle === degree))
  }, [tableData, degree]);


  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Link
              to={"/students/" + cellValues.row.metriculationNumber}
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
      <div>
      <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          style={{width:200}}
          value={degree}
          onChange={(e)=>{setDegree(e.target.value)}}
        >
          <MenuItem value={'Computing Science'}>Computing Science</MenuItem>
          <MenuItem value={'Software Engineering'}>Software Engineering</MenuItem>
          <MenuItem value={'all'}>All</MenuItem>
        </Select>
      </div>
      <div style={{ height: 700, width: "100%" }}>
        <DataGrid
          rows={filteredData}
          columns={columns.concat(actionColumn)}
          pageSize={50}
          checkboxSelection
          rowsPerPageOptions={[10, 50, 100]}
          components={{ Toolbar: GridToolbar }}
          componentsProps={{
            toolbar: { printOptions: { disableToolbarButton: true } },
          }}
        />
      </div>
    </div>
  );
};

export default StudentTable;
