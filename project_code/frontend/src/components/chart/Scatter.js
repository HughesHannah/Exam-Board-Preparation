import React from "react";
import { renderGrade } from "../../utils/GradeConversion.js";
import { useParams } from "react-router-dom";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const ScatterChartExample = ({ inputData }) => {
  const path = useParams();
  const gradeState = "percentage"
  const scale = [0,100];
  const unit = "%";

  let graphData = [];

  let classCode = path.courseID;
  // for each student
  inputData.forEach((student) => {
    let otherClasses = 0;
    let thisClass = 0;
    let classes = [];

    // for each work
    student.work_student.forEach((work) => {
      // if the coursework does not belong to this class
      if (work.course.classCode != classCode) {
        // add mark to class total
        otherClasses += ((work.gradeMark*work.moderation) * work.weighting) / 100;

        // check if course is in list of courses and add it if it is not
        if (!classes.includes(work.course.classCode)) {
          classes.push(work.course.classCode);
        }

        // else the coursework belongs to this class
      } else {
        // add mark to this class total
        thisClass += ((work.gradeMark*work.moderation) * work.weighting) / 100;
      }
    });

    let xValue = renderGrade(thisClass, gradeState, 0);
    let yValue = renderGrade((otherClasses / classes.length), gradeState, 0);

    graphData.push({ x: xValue, y: yValue });
  });

  return (
    <div>
      <ScatterChart
        width={600}
        height={200}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20,
        }}
      >
        <CartesianGrid />
        <XAxis type="number" dataKey="x" name="This Class" unit={unit} domain={scale}/>
        <YAxis type="number" dataKey="y" name="Other Classes" unit={unit} domain={scale}/>
        <Tooltip cursor={{ strokeDasharray: "3 3" }} />
        <Scatter name="CourseGradeComparison" data={graphData} fill="#B06C96" />
      </ScatterChart>
    </div>
  );
};

export default ScatterChartExample;
