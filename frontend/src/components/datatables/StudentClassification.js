import React, { useContext, useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  renderGrade,
  getWeightedGradeFromWorks,
  creditsAtBands,
  getClassification,
} from "../../utils/GradeConversion.js";
import "./datatable.scss";
import AuthContext from "../../context/AuthContext.js";
import DegreePicker from "../picker/DegreePicker.js";
import TableSkeletons from "../skeletons/TableSkeleton.js";
import GradeToggles from "../toggles/GradeToggles.js";

const defaultColumns = [
  {
    field: "matriculationNumber",
    headerName: "Matriculation",
    width: 120,
    valueGetter: (params) => {
      return params.row.matriculationNumber;
    },
  },
];

const StudentClassification = () => {
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(defaultColumns);
  const [gradeState, setGradeState] = useState("percentage");
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [classificationData, setClassificationData] = useState([]);
  const path = useParams();
  let { authTokens } = useContext(AuthContext);

  useEffect(() => {
    // reset columns so we dont infinately add to them
    setColumns(defaultColumns);

    // add calculated columns
    creditsTakenColumn();

    creditsAtBand("A");
    creditsAtBand("B");
    creditsAtBand("C");
    creditsAtBand("D");
    creditsAtBand("Fail");

    projectGradeColumn();
    taughtGradeColumn();
    finalGradeColumn();

    classificationColumn();
  }, [tableData, gradeState]);

  function creditsTakenColumn() {
    const newCreditCol = {
      field: "creditsTaken",
      headerName: "Total Credits",
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
      field: "credits" + bandLetter,
      // headerName: "Credits (" + bandLetter + ")",
      headerName: "> " + bandLetter,
      // width: 120,
      width: 80,
      valueGetter: (params) => {
        const studentWorks = params.row.work_student;
        const creditsByGradeData = creditsAtBands(studentWorks);
        return creditsByGradeData[bandLetter];
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
        return renderGrade(
          getWeightedGradeFromWorks(studentWorks),
          gradeState,
          2
        );
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
        return renderGrade(
          projectWork.gradeMark * projectWork.moderation,
          gradeState,
          2
        );
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
        return renderGrade(
          getWeightedGradeFromWorks(studentWorks),
          gradeState,
          2
        );
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newTotalCol]);
  }

  function classificationColumn() {
    const newClassCol = {
      field: "classification",
      headerName: "Classification",
      width: 250,
      valueGetter: (params) => {
        const studentWorks = params.row.work_student;

        const classification = getClassification(
          studentWorks,
          classificationData
        );

        return classification;
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newClassCol]);
  }

  const fetchDataHandler = useCallback(async () => {
    setError(null);

    try {
      const classificationResponse = await fetch(
        variables.API_URL + "degreeClassificationAPI"
      );
      if (!classificationResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const classificationdata = await classificationResponse.json();
      setClassificationData(classificationdata);
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

  const changeGradeState = (gradeType) => {
    setGradeState(gradeType);
  };

  let dataTableSection = (
    <>
      <div className="filters">
        <DegreePicker />
        <div className="gradeToggles">
          <GradeToggles changeGradeState={changeGradeState} />
        </div>
      </div>
      <DataGrid
        autoHeight
        {...tableData}
        rows={tableData}
        columns={columns.concat(actionColumn)}
        rowsPerPageOptions={[10, 50, 100]}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: { printOptions: { disableToolbarButton: true } },
        }}
      />
    </>
  );

  return (
    <div className="datatable">
      {loading ? <TableSkeletons /> : dataTableSection}
    </div>
  );
};

export default StudentClassification;
