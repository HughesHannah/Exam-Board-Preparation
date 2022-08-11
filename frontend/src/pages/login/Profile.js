import React, { useContext, useState, useEffect } from "react";
import AuthContext from "../../context/AuthContext.js";
import "./profile.scss";

import { variables } from "../../Variables.js";

import Sidebar from "../../components/sidebar/Sidebar.js";

const Profile = () => {
  let { user, authTokens, logoutUser } = useContext(AuthContext);
  let [classHead, setClassHead] = useState([]);

  useEffect(() => {
    getClassHead();
  }, []);

  let getClassHead = async () => {
    let response = await fetch(variables.API_URL + "classheads", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + String(authTokens.access),
      },
    });
    let data = await response.json();
    if (response.status === 200) {
      setClassHead(data);
    } else if (response.statusText === "Unauthorized") {
      logoutUser();
    }
  };

  function getLevels() {
    if (classHead.length != 0) {
      if (classHead.level == "0") {
        return <p>You are eligible to view all levels.</p>;
      } else {
        return <p>You are eligible to view level {classHead.level}.</p>;
      }
    }
  }

  return (
    <div className="profile">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">User Profile Page</h3>

        <div className="table">
          {classHead.length == 0 ? (
            <p>Hello,</p>
          ) : (
            <p>
              Hello {classHead.user.first_name} {classHead.user.last_name},
            </p>
          )}
          <br />
          {getLevels()}
        </div>
      </div>
    </div>
  );
};

export default Profile;
