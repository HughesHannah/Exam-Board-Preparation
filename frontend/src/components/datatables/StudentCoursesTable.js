import React, { useState, useEffect } from "react";
import { variables } from "../../Variables.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';


const columns = [
  { field: "classCode", headerName: "Code", width: 200 },
  { field: "className", headerName: "Course Name", width: 200},
  { field: "credits", headerName: "Credits" },
  // { field: "year.year", headerName: "Year", width: 200},
];

const StudentCoursesTable = () => {
  const [courses, setCourses] = useState([]);
  

  const path = useParams();

  useEffect(() => {
    fetch(variables.API_URL + "studentCoursesAPI/"+path.studentID)
      .then((data) => data.json())
      .then((data) => setCourses(data));       
    
  }, []);

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Link to={"/courses/" + cellValues.row.year.year + "/" + cellValues.row.classCode} style={{ textDecoration: "none" }}>
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
        rows={courses}
        columns={columns.concat(actionColumn)}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
};

export default StudentCoursesTable;
