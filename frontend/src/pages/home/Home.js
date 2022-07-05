import React from 'react'
import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar.js";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">Container</div>
    </div>
  )
}

export default Home