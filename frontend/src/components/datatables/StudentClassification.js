import React, { useContext, useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import { renderGrade } from "../../utils/GradeConversion.js";
import "./datatable.scss";
import AuthContext from "../../context/AuthContext.js";

const defaultColumns = [
  {
    field: "metriculationNumber",
    headerName: "Metriculation",
    valueGetter: (params) => {
      return params.row.metriculationNumber;
    },
  },
];

function sumArray(array) {
  let sum = 0
  array.forEach(val => sum = sum + val)
  return sum.toFixed(2)
}

const StudentClassification = () => {
  const [degree, setDegree] = useState("Computing Science");
  const [gradeData, setGradeData] = useState([]);
  const [courseData, setCourseData] = useState([])
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(defaultColumns);
  const [gradeState, setGradeState] = useState("percentage");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const path = useParams();
  let { authTokens, logoutUser } = useContext(AuthContext);
  

  useEffect(() => {
    // reset columns so we dont infinately add to them
    setColumns(defaultColumns);

    // get the names of each graded work
    const works = [...new Set(gradeData.map((item) => item.name))];

    // get the names of each course
    const courseNames = [...new Set(courseData.map((item) => item.className))];
    console.log(courseNames);

    // add calculated columns
    projectGradeColumn();
    taughtGradeColumn();
    finalGradeColumn();
  }, [tableData, gradeState]);

  function taughtGradeColumn() {
    const newTaughtCol = {
      field: "taughtGrade",
      headerName: "Taught Grade",
      width: 130,
      valueGetter: (params) => {
      
      const studentWorks = params.row.work_student.filter(work => !work.course.className.includes("project"))
      console.log(studentWorks)

      let weightedCourseMarks = {}

      studentWorks.forEach(work => weightedCourseMarks[work.course.className] = [])
      studentWorks.forEach(work => weightedCourseMarks[work.course.className].push((work.gradeMark * work.weighting)/100) )
      
      console.log(weightedCourseMarks)

      let percentagesByCourse = {}

      Object.entries(weightedCourseMarks).forEach(entry => {
        const [key, value] = entry;
        percentagesByCourse[key] = sumArray(value);
      })
      console.log(percentagesByCourse)

      let creditsByCourse = {}
      studentWorks.forEach(work => creditsByCourse[work.course.className] = work.course.credits )
      console.log(creditsByCourse)

      let numCredits = 0
      Object.values(creditsByCourse).forEach(val => numCredits += val)
      console.log(numCredits)

      let totalWeighted = 0
      Object.entries(percentagesByCourse).forEach(entry => {
        const [courseName, percentage] = entry;
        totalWeighted += (percentage * creditsByCourse[courseName])
      })
      console.log(totalWeighted)

      return (totalWeighted/numCredits).toFixed(2)
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newTaughtCol]);
  }

  function projectGradeColumn() {
    const newProjectCol = {
      field: "projectGrade",
      headerName: "Project Grade",
      width: 130,
      valueGetter: (params) => {
        const projectWork = params.row.work_student.find(work => work.course.className.includes("project"))
        return projectWork.gradeMark
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newProjectCol]);
  }

  function finalGradeColumn() {
    const newTotalCol = {
      field: "finalGrade",
      headerName: "Final Grade",
      width: 130,
      valueGetter: (params) => {
        return 'todo'
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newTotalCol]);
  }

  function finalGradeColumn() {
    const newTotalCol = {
      field: "finalGrade",
      headerName: "Final Grade",
      width: 130,
      valueGetter: (params) => {
        return 'todo'
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newTotalCol]);
  }

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const courseResponse = await fetch(
        variables.API_URL +
          "courseAPI/simple" 
      );
      if (!courseResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const coursedata = await courseResponse.json();
      setCourseData(coursedata);
    } catch (error) {
      setError(error.message);
    }

    try {
      const gradeResponse = await fetch(
        variables.API_URL +
          "gradesAPI/" + degree, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
      );
      if (!gradeResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const gradedata = await gradeResponse.json();
      setGradeData(gradedata);
    } catch (error) {
      setError(error.message);
    }

    try {
      const studentgradeResponse = await fetch(
        variables.API_URL +
          "studentAPI/grades/" + degree, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + String(authTokens.access),
            },
          }
      );
      if (!studentgradeResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const studentgradeData = await studentgradeResponse.json().then(setLoading(false));
      setTableData(studentgradeData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler, degree]);

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

  let dataTableSection = (<>
  <Select
      id="degree-select"
      style={{ width: 200 }}
      value={degree}
      onChange={(e) => {
        setDegree(e.target.value);
        setLoading(true);
      }}
    >
      <MenuItem value={"Computing Science"}>Computing Science</MenuItem>
      <MenuItem value={"Software Engineering"}>SoftwareEngineering</MenuItem>
      
    </Select>
    <Select
      id="grade-select"
      style={{ width: 200 }}
      value={gradeState}
      onChange={(e) => {
        setGradeState(e.target.value);
      }}
    >
      <MenuItem value={"percentage"}>Percentage</MenuItem>
      <MenuItem value={"band"}>Band</MenuItem>
      <MenuItem value={"point"}>Point</MenuItem>
    </Select>
    <DataGrid
      rows={tableData}
      columns={columns.concat(actionColumn)}
      pageSize={50}
      checkboxSelection
      components={{ Toolbar: GridToolbar }}
    /></>)

  return (
    <div style={{ height: 700, width: "100%" }} className="datatable">
      {loading ? (<p>Loading...</p>):   (
      dataTableSection
      ) }
    </div>
  );
};

export default StudentClassification;
