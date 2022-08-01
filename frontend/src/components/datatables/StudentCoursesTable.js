import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';

const defaultColumns = [
  { field: "classCode", headerName: "Code", width: 200 },
  { field: "className", headerName: "Course Name", width: 200},
  { field: "credits", headerName: "Credits" },
];

const StudentCoursesTable = () => {
  const [courseData, setCourseData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [columns, setColumns] = useState(defaultColumns);
  const [error, setError] = useState(null);
  const path = useParams();

  useEffect(() => {
    setColumns(defaultColumns);
    const works = [...new Set(gradeData.map((item) => item.name))];
    works.forEach((work) => {
      addColumn(work);
    });
    totalsColumn();
  }, [gradeData]);

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
          return (
            obj.course.classCode === rowCourse.classCode
          );
        });

        return myCourseAssesment ? myCourseAssesment.gradeMark : "-";
      },
    };

    setColumns((columns) => [...columns, newCol]); // how to update state using existing!
  }

  function totalsColumn() {
    const newTotalCol = {
      field: 'totalGrade',
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
          finalGrade = finalGrade + (obj.gradeMark*obj.weighting/100)
        })

        return finalGrade ? finalGrade.toFixed(1) : "";
      },
    };
    setColumns((columns) => [...columns, newTotalCol]); // how to update state using existing!
  }

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        variables.API_URL + "studentCoursesAPI/"+path.studentID
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setCourseData(data);
    } catch (error) {
      setError(error.message);
    }
    try {
      const response2 = await fetch(
        variables.API_URL + "studentCoursesAPI/"+path.studentID + "/grades"
      );
      if (!response2.ok) {
        throw new Error("Something went wrong!");
      }
      const data2 = await response2.json();
      setGradeData(data2);
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
        rows={courseData}
        columns={columns.concat(actionColumn)}
        pageSize={50}
        checkboxSelection
      />
    </div>
  );
};

export default StudentCoursesTable;
