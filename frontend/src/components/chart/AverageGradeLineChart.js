import React, { useEffect } from "react";
import "./chart.scss";
import {averageGrade} from "../../utils/GradeConversion.js";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";



const AverageGradeLineChart = ({inputData}) => {

  const data = [
    {
      name: "2016",
      avg: 10,
    },
    {
      name: "2017",
      avg: 13,
    },
    {
      name: "2018",
      avg: 15,
    },
    {
      name: "2019",
      avg: 11,
    },
    {
      name: "2020",
      avg: 9,
    },
    {
      name: "2021",
      avg: 10,
    },
    {
      name: "2022",
      avg: averageGrade(inputData, "point"),
    },
  ];

  return (
    <div className="chart">
      
      <LineChart
        width={500}
        height={240}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <XAxis dataKey="name" />
        <YAxis domain={["dataMin", "dataMax"]} />
        <Tooltip />
        <Line
          type="monotone"
          dataKey="avg"
          stroke="#B06C96"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      
      </div>
  );
};

export default AverageGradeLineChart;
