import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, gridColumnsTotalWidthSelector } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

const StudentInCourseTable = () => {
  const [studentData, setStudentData] = useState([]);
  const [gradeData, setGradeData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);

  const columns = [
    { field: "metriculationNumber", headerName: "Metriculation" },
    { field: "name", headerName: "Student Name", width: 200 },
    { field: "degreeTitle", headerName: "Degree", width: 200 },
  ];

  const Assesment1Col = [
    {
      field: "Assessment1",
      headerName: "Assessment 1",
      width: 200,
      valueGetter: (params) => {
        let rowStudent = studentData.find((obj) => {
          return obj.id === params.row.id;
        });

        let allStudentAssesment1 = gradeData.filter((obj) => {
          return obj.name === "Assessment 1";
        });

        let myStudentAssesment1 = allStudentAssesment1.find((obj) => {
          return (
            obj.student.metriculationNumber === rowStudent.metriculationNumber
          );
        });

        return myStudentAssesment1 ? myStudentAssesment1.gradeMark : "";
      },
    },
  ];

  const path = useParams();

  const fetchDataHandler = useCallback(async () => {
    setIsLoading(true);
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
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchDataHandler();
  }, [fetchDataHandler]);

  return (
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={studentData}
        columns={columns.concat(Assesment1Col)}
        pageSize={12}
        checkboxSelection
      />
    </div>
  );
};

export default StudentInCourseTable;
