import React, { useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Chip from "../../components/chip/Chip.js";
import "./datatable.scss";

const columns = [
  { field: "metriculationNumber", headerName: "Metriculation" },
  { field: "name", headerName: "Student Name", width: 200 },
  { field: "degreeTitle", headerName: "Degree", width: 200 },
  { field: "mastersStudent", headerName: "Masters?" },
  { field: "fastRouteStudent", headerName: "Fast Route?" },
  { field: "yearOfStudy", headerName: "Year" },
];

const StudentTable = () => {
  const [degree, setDegree] = useState('all');
  const [tableData, setTableData] = useState([]);
  const [filteredData, setFilteredData] = useState(tableData)
  
  

  useEffect(() => {
    fetch(variables.API_URL + "studentAPI")
      .then((data) => data.json())
      .then((data) => setTableData(data));

      setFilteredData(degree === 'all' ? tableData: tableData.filter(dt=>dt.degreeTitle === degree))
  }, [degree]);


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
      <div className="chips">
        {/* <Chip /> */}
      </div>
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
          pageSize={10}
          checkboxSelection
          rowsPerPageOptions={[10, 50, 100]}
        />
      </div>
    </div>
  );
};

export default StudentTable;
