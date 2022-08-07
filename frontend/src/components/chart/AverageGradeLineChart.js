import React, { useState, useEffect, useContext } from "react";
import "./chart.scss";
import {averageGrade} from "../../utils/GradeConversion.js";
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { variables } from "../../Variables.js";
import AuthContext from "../../context/AuthContext.js";


const AverageGradeLineChart = () => {
  let { user, authTokens, logoutUser } = useContext(AuthContext);
  const [studentGrades, setStudentGrades] = useState([]);
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
      avg: averageGrade(studentGrades, "point"),
    },
  ];

  const fetchGrades = async () => {
    const res = await fetch(variables.API_URL + "studentAPI/grades", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    })
      .then((data) => data.json())
      .then((data) => setStudentGrades(data))
  };

  useEffect(() => {
    fetchGrades();
  }, []);

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
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      
      </div>
  );
};

export default AverageGradeLineChart;
