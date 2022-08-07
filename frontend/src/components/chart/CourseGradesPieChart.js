import React, { useContext, useState, useEffect } from "react";
import { countBands } from "../../utils/GradeConversion.js";
import { PieChart, Pie, Sector, Cell, Tooltip } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#800080"];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;

  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;

  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      {payload.name !== "No Data Found" && (
        <React.Fragment>
          <path
            d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
            stroke={fill}
            fill="none"
          />
          <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            textAnchor={textAnchor}
            fill="#333"
          >{`${value}`}</text>
          <text
            x={ex + (cos >= 0 ? 1 : -1) * 12}
            y={ey}
            dy={18}
            textAnchor={textAnchor}
            fill="#999"
          >
            {`(${(percent * 100).toFixed(2)}%)`}
          </text>
        </React.Fragment>
      )}
    </g>
  );
};

const initialState = {
  activeIndex: 0,
};

const CourseGradesPieChart = ({ inputData }) => {
  const [pieState, setPieState] = useState(initialState);
  const [data, setData] = useState([]);

  useEffect(() => {
    let result = countBands(inputData);
    setData(result);
  }, []);

  const onPieEnter = (data, index) => {
    setPieState({ activeIndex: index });
  };

  const pieRender = (
    <PieChart width={400} height={250} onMouseEnter={onPieEnter}>
      <Pie
        activeIndex={pieState.activeIndex}
        activeShape={renderActiveShape}
        data={data}
        cx={195}
        cy={100}
        innerRadius={60}
        outerRadius={80}
        onMouseEnter={onPieEnter}
        dataKey="value"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
        <Tooltip />
      </Pie>
    </PieChart>
  );

  return <div>{pieRender}</div>;
}

export default CourseGradesPieChart;
