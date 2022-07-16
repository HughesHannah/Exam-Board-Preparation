import React, {useContext}from 'react'
import AuthContext from "../../context/AuthContext.js"
import "./profile.scss";

import Sidebar from "../../components/sidebar/Sidebar.js";

const Profile = () => {
    let {name} = useContext(AuthContext)
  return (
    <div className="profile">
        <Sidebar />
      <div className="mainContainer">
        <div className="title">
          <h2>User Profile Page</h2>
        </div>
        <div className="table">
          <p>Hello, {name}</p>
        </div>
      </div>
    </div>
  )
}

export default Profile