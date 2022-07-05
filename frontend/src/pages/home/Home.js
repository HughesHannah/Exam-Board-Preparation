import React from 'react'
import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar.js";
import Navbar from "../../components/navbar/Navbar.js";
import Widget from "../../components/widget/Widget.js";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="studentCounter"/>
          <Widget type="completedCourseCounter"/>
          <Widget type="preponderanceCounter"/>
          <Widget type="issueCounter"/>
        </div>
      </div>
    </div>
  )
}

export default Home