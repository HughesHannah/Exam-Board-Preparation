import React, { PureComponent } from "react";
import "./chart.scss";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";


const chart = () => {
  const data = [
    {
      name: "2016",
      avg: 15,
    },
    {
      name: "2017",
      avg: 18,
    },
    {
      name: "2018",
      avg: 17,
    },
    {
      name: "2019",
      avg: 19,
    },
    {
      name: "2020",
      avg: 22,
    },
    {
      name: "2021",
      avg: 18,
    },
    {
      name: "2022",
      avg: 17,
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
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
      
      </div>
  );
};

export default chart;
