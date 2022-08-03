import React from "react";
import "./featured.scss";

import GradesPieChart from "../chart/GradesPieChart.js";

const Featured = () => {
  return (
    <div className="featured">
      <div className="bottom">
        <div className="featuredChart">
          <GradesPieChart />
        </div>
      </div>
    </div>
  );
};

export default Featured;
