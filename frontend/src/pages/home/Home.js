import React from 'react'
import "./home.scss"
import Sidebar from "../../components/sidebar/Sidebar.js";
import Navbar from "../../components/navbar/Navbar.js";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        home stuff
      </div>
    </div>
  )
}

export default Home