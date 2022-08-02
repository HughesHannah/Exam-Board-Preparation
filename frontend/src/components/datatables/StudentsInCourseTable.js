import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

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
    setColumns(defaultColumns);
    const works = [...new Set(gradeData.map((item) => item.name))];
    works.forEach((work) => {
      addColumn(work);
    })
    totalsColumn();
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

        let finalGrade = 0;
        if(myStudentAssesment){
          if(myStudentAssesment.preponderance != 'NA'){
            finalGrade = myStudentAssesment.preponderance;
          }else{
            finalGrade = myStudentAssesment.gradeMark
          } 
        }

        return finalGrade != 0 ? finalGrade : "-";
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
        let rowStudent = studentData.find((obj) => {
          return obj.id === params.row.id;
        });

        let allStudentAssesment = gradeData.filter((obj) => {
          return obj.student.metriculationNumber === rowStudent.metriculationNumber;
        });

        let finalGrade = 0;
        allStudentAssesment.forEach((obj) => {
          if(obj.preponderance != 'NA'){
            finalGrade = obj.preponderance;
          }else{
            finalGrade = finalGrade + (obj.gradeMark*obj.weighting/100)
          } 
        })

        return finalGrade !=0 ? finalGrade : "-";
      },
    };
    setColumns((columns) => [...columns, newTotalCol]); // how to update state using existing!
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
    <div style={{ height: 700, width: "100%" }}>
      <DataGrid
        rows={studentData}
        columns={columns.concat(actionColumn)}
        pageSize={50}
        checkboxSelection
        components={{ Toolbar: GridToolbar }}
      />
    </div>
  );
};

export default StudentInCourseTable;
