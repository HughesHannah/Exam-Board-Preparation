import React, { useContext, useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {
  renderGrade,
  getWeightedGradeFromWorks,
  creditsAtBands,
} from "../../utils/GradeConversion.js";
import "./datatable.scss";
import AuthContext from "../../context/AuthContext.js";
import DegreePicker from "../picker/DegreePicker.js";
import TableSkeletons from "../skeletons/TableSkeleton.js";

const defaultColumns = [
  {
    field: "metriculationNumber",
    headerName: "Metriculation",
    valueGetter: (params) => {
      return params.row.metriculationNumber;
    },
  },
];

const StudentClassification = () => {
  const [courseData, setCourseData] = useState([]);
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

    // add calculated columns
    creditsTakenColumn();

    creditsAtBand('A');
    creditsAtBand('B');
    creditsAtBand('C');
    creditsAtBand('D');
    creditsAtBand('Fail');

    projectGradeColumn();
    taughtGradeColumn();
    finalGradeColumn();
  }, [tableData, gradeState]);

  function creditsTakenColumn() {
    const newCreditCol = {
      field: "creditsTaken",
      headerName: "Credits",
      width: 130,
      valueGetter: (params) => {
        const studentWorks = params.row.work_student;
        let creditsByCourse = {};
        studentWorks.forEach(
          (work) =>
            (creditsByCourse[work.course.className] = work.course.credits)
        );
        let numCredits = 0;
        Object.values(creditsByCourse).forEach((val) => (numCredits += val));
        return numCredits;
      },
    };
    setColumns((columns) => [...columns, newCreditCol]);
  }

  function creditsAtBand(bandLetter) {
    const newBandCol = {
      field: "credits"+bandLetter,
      headerName: "Band "+bandLetter,
      width: 130,
      valueGetter: (params) => {
        const studentWorks = params.row.work_student;
        const creditsByGradeData = creditsAtBands(studentWorks)
        return creditsByGradeData[bandLetter]
      },
    };
    setColumns((columns) => [...columns, newBandCol]);
  }

  function taughtGradeColumn() {
    const newTaughtCol = {
      field: "taughtGrade",
      headerName: "Taught Grade",
      width: 130,
      valueGetter: (params) => {
        const studentWorks = params.row.work_student.filter(
          (work) => !work.course.className.includes("project")
        );
        return renderGrade(getWeightedGradeFromWorks(studentWorks), gradeState);
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
        const projectWork = params.row.work_student.find((work) =>
          work.course.className.includes("project")
        );
        return renderGrade((projectWork.gradeMark*projectWork.moderation), gradeState);
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
        const studentWorks = params.row.work_student;
        return renderGrade(getWeightedGradeFromWorks(studentWorks), gradeState);
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newTotalCol]);
  }

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const courseResponse = await fetch(
        variables.API_URL + "courseAPI/simple"
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
      const studentgradeResponse = await fetch(
        variables.API_URL + "studentAPI/grades/" + path.degree,
        {
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
      const studentgradeData = await studentgradeResponse
        .json()
        .then(setLoading(false));
      setTableData(studentgradeData);
    } catch (error) {
      setError(error.message);
    }
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

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

  let dataTableSection = (
    <>
      <DegreePicker />
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
        componentsProps={{
          toolbar: { printOptions: { disableToolbarButton: true } },
        }}
      />
    </>
  );

  return (
    <div style={{ height: 700, width: "100%" }} className="datatable">
      {loading ? <TableSkeletons /> : dataTableSection}
    </div>
  );
};

export default StudentClassification;
