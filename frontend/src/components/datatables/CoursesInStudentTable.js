import React, { useState, useEffect} from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { renderGrade } from "../../utils/GradeConversion.js";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import "./datatable.scss";

const defaultColumns = [
  { field: "classCode", headerName: "Code", width: 200 },
  { field: "className", headerName: "Course Name", width: 200 },
  { field: "credits", headerName: "Credits" },
];

const CoursesInStudentTable = ({courseData, gradeData}) => {
  const [columns, setColumns] = useState(defaultColumns);
  const [gradeState, setGradeState] = useState("percentage");

  useEffect(() => {
    setColumns(defaultColumns);
    const works = [...new Set(gradeData.map((item) => item.name))];
    works.forEach((work) => {
      addColumn(work);
    });
    totalsColumn();
  }, [gradeData, gradeState]);

  function addColumn(work) {
    const slugName = work.replace(" ", "");
    const newCol = {
      field: slugName,
      headerName: work,
      width: 130,
      valueGetter: (params) => {
        // get course object
        let rowCourse = courseData.find((obj) => {
          return obj.id === params.row.id;
        });

        // get all grades for that course
        let allCourseAssesment = gradeData.filter((obj) => {
          return obj.name === work;
        });

        // get specific grade for that course assignment
        let myCourseAssesment = allCourseAssesment.find((obj) => {
          return obj.course.classCode === rowCourse.classCode;
        });

        let finalGrade = 0;
        if (myCourseAssesment) {
          if (myCourseAssesment.preponderance != "NA") {
            finalGrade = myCourseAssesment.preponderance;
          } else {
            finalGrade =
              myCourseAssesment.gradeMark * myCourseAssesment.moderation;
          }
        }
        return finalGrade != 0 ? renderGrade(finalGrade, gradeState, 0) : "-";
      },
      renderCell: (params) => {
        const cellValue = params.value;
        // get course object
        let rowCourse = courseData.find((obj) => {
          return obj.id === params.row.id;
        });

        // get all grades for that course
        let allCourseAssesment = gradeData.filter((obj) => {
          return obj.name === work;
        });

        // get specific grade for that course assignment
        let myCourseAssesment = allCourseAssesment.find((obj) => {
          return obj.course.classCode === rowCourse.classCode;
        });

        let status = "NONE";
        if (myCourseAssesment) {
          if (myCourseAssesment.preponderance != "NA") {
            status = "PREP";
          } else {
            status = "GRADE";
          }
        }
        return cellValue != "-" ? (
          <Tooltip title={myCourseAssesment.weighting + "% weighting"}>
            <div className={`status ${status}`}>{cellValue}</div>
          </Tooltip>
        ) : (
          "-"
        );
      },
    };

    setColumns((columns) => [...columns, newCol]); // how to update state using existing!
  }

  function totalsColumn() {
    const newTotalCol = {
      field: "totalGrade",
      headerName: "Final Grade",
      width: 130,
      valueGetter: (params) => {
        let rowCourse = courseData.find((obj) => {
          return obj.id === params.row.id;
        });

        let allCourseAssesment = gradeData.filter((obj) => {
          return obj.course.classCode === rowCourse.classCode;
        });

        let finalGrade = 0;
        allCourseAssesment.forEach((obj) => {
          if (obj.preponderance != "NA") {
            finalGrade = finalGrade + obj.weighting / 100;
          } else {
            finalGrade =
              finalGrade +
              (obj.gradeMark * obj.moderation * obj.weighting) / 100;
          }
        });

        return finalGrade != 0 ? renderGrade(finalGrade, gradeState, 2) : "-";
      },
    };
    setColumns((columns) => [...columns, newTotalCol]); // how to update state using existing!
  }

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (cellValues) => {
        return (
          <div className="cellAction">
            <Link
              to={
                "/courses/" +
                cellValues.row.year.year +
                "/" +
                cellValues.row.classCode
              }
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
        rows={courseData}
        columns={columns.concat(actionColumn)}
        pageSize={50}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
        componentsProps={{
          toolbar: { printOptions: { disableToolbarButton: true } },
        }}
      />
    </div>
  );
};

export default CoursesInStudentTable;
