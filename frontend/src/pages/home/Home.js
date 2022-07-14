import React from "react";
import "./home.scss";

import SearchIcon from "@mui/icons-material/Search";

import Sidebar from "../../components/sidebar/Sidebar.js";
import Widget from "../../components/widget/Widget.js";
import Featured from "../../components/featured/Featured.js";
import Chart from "../../components/chart/Chart.js";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <div className="widgets">
          <Widget type="studentCounter" />
          <Widget type="completedCourseCounter" />
          <Widget type="preponderanceCounter" />
          <Widget type="issueCounter" />
        </div>
        <div className="searchdiv">
          <div className="search">
            <SearchIcon className="searchIcon" />
            <input type="text" placeholder="Search..." />
          </div>
        </div>
        <div className="charts">
          <div className="pieChart">
            <Featured />
          </div>
          <div className="lineChart">
            <Chart />
          </div>
        </div>
        <div className="table"></div>
      </div>
    </div>
  );
};

export default Home;
