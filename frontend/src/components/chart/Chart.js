import React, { PureComponent } from "react";
import "./chart.scss";

import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";

const chart = () => {
  const data = [
    {
      name: "2016",
      ag: 15,
    },
    {
      name: "2017",
      ag: 18,
    },
    {
      name: "2018",
      ag: 17,
    },
    {
      name: "2019",
      ag: 19,
    },
    {
      name: "2020",
      ag: 22,
    },
    {
      name: "2021",
      ag: 18,
    },
    {
      name: "2022",
      ag: 17,
    },
  ];

  return (
    <div className="chart">
      <div className="top">
        <h1 className="title">Average Student Grade by Year</h1>
      </div>
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
          dataKey="ag"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default chart;
