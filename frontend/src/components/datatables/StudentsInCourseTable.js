import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

const defaultColumns = [
  { field: "metriculationNumber", headerName: "Metriculation" },
  { field: "name", headerName: "Student Name", width: 200 },
  { field: "degreeTitle", headerName: "Degree", width: 200 },
];

const StudentInCourseTable = () => {
  const [studentData, setStudentData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [error, setError] = useState(null);
  const [columns, setColumns] = useState(defaultColumns);

  useEffect(() => {
    const works = [...new Set(gradeData.map((item) => item.name))];
    works.forEach((work) => {
      addColumn(work);
    });
  }, [gradeData]);

  function addColumn(work) {
    const slugName = work.replace(" ", "");
    const newCol = {
      field: slugName,
      headerName: work,
      width: 130,
      valueGetter: (params) => {
        let rowStudent = studentData.find((obj) => {
          return obj.id === params.row.id;
        });

        let allStudentAssesment = gradeData.filter((obj) => {
          return obj.name === work;
        });

        let myStudentAssesment = allStudentAssesment.find((obj) => {
          return (
            obj.student.metriculationNumber === rowStudent.metriculationNumber
          );
        });

        return myStudentAssesment ? myStudentAssesment.gradeMark : "";
      },
    };

    setColumns((columns) => [...columns, newCol]); // how to update state using existing!
  }

  const path = useParams();

  const fetchDataHandler = useCallback(async () => {
    setError(null);
    try {
      const response = await fetch(
        variables.API_URL +
          "courseAPI/" +
          path.year +
          "/" +
          path.courseID +
          "/students"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      setError(error.message);
    }
    try {
      const response2 = await fetch(
        variables.API_URL +
          "courseAPI/" +
          path.year +
          "/" +
          path.courseID +
          "/students/grades"
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

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={studentData}
        columns={columns}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
};

export default StudentInCourseTable;
