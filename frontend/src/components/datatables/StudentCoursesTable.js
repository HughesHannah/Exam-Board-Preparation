import React, { useState, useEffect, useCallback } from "react";
import { variables } from "../../Variables.js";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom';
import {renderGrade} from '../../utils/GradeConversion.js';
import MenuItem from '@mui/material/MenuItem';
import Tooltip from '@mui/material/Tooltip';
import Select from '@mui/material/Select';
import './datatable.scss';

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
  const [gradeState, setGradeState] = useState('percentage');
  const path = useParams();

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
      renderCell: (params) => {
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

        let finalGrade = 0;
        let status = 'NONE'
        if(myCourseAssesment){
          if(myCourseAssesment.preponderance != 'NA'){
            finalGrade = myCourseAssesment.preponderance;
            status = 'PREP'
          }else{
            finalGrade = (myCourseAssesment.gradeMark*myCourseAssesment.moderation)
            status = 'GRADE'
          } 
        }
        return finalGrade != 0 ? (<Tooltip title={myCourseAssesment.weighting + "\% weighting"}><div className={`status ${status}`}>{renderGrade(finalGrade, gradeState)}</div></Tooltip>) : "-";
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
          if(obj.preponderance != 'NA'){
            finalGrade = finalGrade + obj.weighting/100;
          }else{
            finalGrade = finalGrade + ((obj.gradeMark*obj.moderation)*obj.weighting/100)
          } 
        })

        return finalGrade !=0 ? renderGrade(finalGrade, gradeState) : "-";
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
    <div style={{ height: 700, width: "100%" }} className='datatable'>
      <Select
          id="grade-select"
          style={{width:200}}
          value={gradeState}
          onChange={(e)=>{setGradeState(e.target.value)}}
        >
          <MenuItem value={'percentage'}>Percentage</MenuItem>
          <MenuItem value={'band'}>Band</MenuItem>
          <MenuItem value={'point'}>Point</MenuItem>
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

export default StudentCoursesTable;
