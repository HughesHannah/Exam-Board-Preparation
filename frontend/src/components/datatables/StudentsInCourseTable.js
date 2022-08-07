import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import { renderGrade } from "../../utils/GradeConversion.js";
import "./datatable.scss";

const defaultColumns = [
  {
    field: "metriculationNumber",
    headerName: "Metriculation",
    valueGetter: (params) => {
      return params.row.metriculationNumber;
    },
  },
  {
    field: "name",
    headerName: "Student Name",
    valueGetter: (params) => {
      return params.row.name;
    },
  },
  {
    field: "degreeTitle",
    headerName: "Degree",
    valueGetter: (params) => {
      return params.row.degreeTitle;
    },
  },
];

const StudentInCourseTable = () => {
  const [gradeData, setGradeData] = useState([]);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(defaultColumns);
  const [gradeState, setGradeState] = useState("percentage");
  const [courseData, setCourseData] = useState([]);
  const path = useParams();

  useEffect(() => {
    // reset columns so we dont infinately add to them
    setColumns(defaultColumns);

    console.log(courseData)
    // get the names of each graded work
    const works = [...new Set(courseData.map((item) => item.name))];
    works.forEach((work) => {
      addGradedWorkColumn(work);
    });

    // calculate final exam grade
    finalExamGradeColumn();

    //calculate final grade
    finalGradeColumn();
  }, [courseData, gradeState]);

  function addGradedWorkColumn(work) {
    const slugName = work.replace(" ", "");
    const newCol = {
      field: slugName,
      headerName: work,
      width: 130,
      valueGetter: (params) => {
        // find the students work for this class
        let worksForClass = params.row.work_student.filter((obj) => {
          return obj.course.classCode === path.courseID;
        });

        // find the students work for this column
        let individualWork
        if(worksForClass.length>1){ //more than one assignment type, find correct one
          individualWork = worksForClass.find((obj) => {
            return obj.name === work;
          });
        }else{ // only one assignment type, set it to this one
          individualWork = worksForClass[0];
        }

        // formatting and check for preponderance
        let finalGrade = 0;
        let status = "NONE";
        if (individualWork) {
          if (individualWork.preponderance != "NA") {
            finalGrade = individualWork.preponderance;
            status = "PREP";
          } else {
            finalGrade = individualWork.gradeMark;
            status = "GRADE";
          }
        }

        // return the result with a hover over weighting
        return finalGrade != 0 ? renderGrade(finalGrade, gradeState) : "-";
      },
      renderCell: (params) => {
        const valueOfCell = params.value;

        let worksForClass = params.row.work_student.filter((obj) => {
          return obj.course.classCode === path.courseID;
        });
        // find the students work for this column
        let individualWork
        if(worksForClass.length>1){ //more than one assignment type, find correct one
          individualWork = worksForClass.find((obj) => {
            return obj.name === work;
          });
        }else{ // only one assignment type, set it to this one
          individualWork = worksForClass[0];
        }
      
        // formatting and check for preponderance
        let status = "NONE";
        if (individualWork) {
          if (individualWork.preponderance != "NA") {
            status = "PREP";
          } else {
            status = "GRADE";
          }
        }

        // return the result with a hover over weighting
        return params.value != 0 ? (
          <Tooltip title={individualWork.weighting + "% weighting"}>
            <div className={`status ${status}`}>{valueOfCell}</div>
          </Tooltip>
        ) : (
          "-"
        );
      },
    };
    // add the new column to the list of columns
    setColumns((columns) => [...columns, newCol]); // how to update state using existing!
  }

  function finalExamGradeColumn() {
    const examCol = {
      field: "examGrade",
      headerName: "Exam Grade",
      width: 130,
      valueGetter: (params) => {
        // find the students work for this class
        let worksForClass = params.row.work_student.filter((obj) => {
          return obj.course.classCode === path.courseID;
        });

        let examGrade = 0;
        let examWeight = 0;

        worksForClass.forEach((obj) => {
          if (obj.type == "E") {
            if (obj.preponderance != "NA") {
              examGrade = obj.preponderance;
            } else {
              // if a previous exam Q was marked as MV, examGrade will not be integer
              if (!(examGrade instanceof String)) {
                examGrade = examGrade + (obj.gradeMark * obj.weighting) / 100;
              }
            }
            examWeight += obj.weighting;
          }
        });

        let examFinalGrade = (examGrade / examWeight) * 100;

        // return the result with a hover over weighting
        return examFinalGrade != 0
          ? renderGrade(examFinalGrade, gradeState)
          : "-";
      },
      renderCell: (params) => {
        const cellValue = params.value;

        // find the students work for this class
        let worksForClass = params.row.work_student.filter((obj) => {
          return obj.course.classCode === path.courseID;
        });

        let examWeight = 0;
        let status = "NONE";
        worksForClass.forEach((obj) => {
          if (obj.type == "E") {
            if (obj.preponderance != "NA") {
              status = "PREP";
            } else {
              // if a previous exam Q was marked as MV, examGrade will not be integer
              if (!(cellValue instanceof String)) {
                status = "GRADE";
              }
            }
            examWeight += obj.weighting;
          }
        });

        // return the result with a hover over weighting
        return cellValue != 0 ? (
          <Tooltip title={examWeight + "%  exam total weighting"}>
            <div className={`status ${status}`}>{cellValue}</div>
          </Tooltip>
        ) : (
          "-"
        );
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, examCol]);
  }

  function finalGradeColumn() {
    const newTotalCol = {
      field: "finalGrade",
      headerName: "Final Grade",
      width: 130,
      valueGetter: (params) => {
        // find the students work for this class
        let worksForClass = params.row.work_student.filter((obj) => {
          return obj.course.classCode === path.courseID;
        });

        let finalGrade = 0;
        worksForClass.forEach((obj) => {
          if (obj.preponderance != "NA") {
            finalGrade += obj.weighting / 100;
          } else {
            finalGrade = finalGrade + (obj.gradeMark * obj.weighting) / 100;
          }
        });

        return finalGrade != 0 ? renderGrade(finalGrade, gradeState) : "-";
      },
    };
    // add to list of columns
    setColumns((columns) => [...columns, newTotalCol]);
  }

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const gradeResponse = await fetch(
        variables.API_URL +
          "courseAPI/" +
          path.year +
          "/" +
          path.courseID +
          "/students/grades"
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
      const courseResponse = await fetch(
        variables.API_URL +
          "courseAPI/" +
          path.year +
          "/" +
          path.courseID + "/grades"
      );
      if (!courseResponse.ok) {
        throw new Error("Something went wrong!");
      }
      const coursedata = await courseResponse.json();
      setCourseData(coursedata);
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

  return (
    <div style={{ height: 700, width: "100%" }} className="datatable">
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
        rows={gradeData}
        columns={columns.concat(actionColumn)}
        pageSize={50}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default StudentInCourseTable;
