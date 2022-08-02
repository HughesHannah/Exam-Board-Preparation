import React from "react";
import "./featured.scss";

import GradesPieChartExample from "./GradesPieChart.js";

const Featured = () => {
  return (
    <div className="featured">
      <div className="bottom">
        <div className="featuredChart">
          <GradesPieChartExample />
        </div>
      </div>
    </div>
  );
};

export default Featured;
