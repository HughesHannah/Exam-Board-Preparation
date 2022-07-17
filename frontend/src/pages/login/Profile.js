import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext.js";
import "./profile.scss";

import { variables } from "../../Variables.js";

import Sidebar from "../../components/sidebar/Sidebar.js";

const Profile = () => {
  let { user, authTokens, logoutUser } = useContext(AuthContext);
  let [classHeads, setClassHeads] = useState([]);

  useEffect(() => {
    getClassHeads();
  }, []);

  let getClassHeads = async () => {
    let response = await fetch(variables.API_URL + "classheads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if(response.status === 200){
      setClassHeads(data);
    }else if(response.statusText === 'Unauthorized'){
     logoutUser()
    }
  };

  return (
    <div className="profile">
      <Sidebar />
      <div className="mainContainer">
        <div className="title">
          <h2>User Profile Page</h2>
        </div>
        <div className="table">
          {user && <p>Hello, {user.username}</p>}

          <p>You are eligible to view levels;</p>
          <ul>
            {classHeads.map((classHead) => (
              <li key={classHead.id}>{classHead.level}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Profile;
