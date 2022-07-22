import React, { useState, useEffect } from "react";
import "./changeYear.scss";
import { variables } from "../../Variables";

import Sidebar from "../../components/sidebar/Sidebar.js";

const changeYear = () => {
  let [years, setYears] = useState([]);

  useEffect(() => {
    getYears();
  }, []);

  let getYears = async () => {
    let response = await fetch(variables.API_URL + "yearsAPI", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    setYears(data);
  };

  let handleClick = () => {
    alert("clicked")
    // TODO change year here
  }

  return (
    <div className="changeYear">
      <Sidebar />
      <div className="mainContainer">
        <div>
          <h1 className="title">Change Year</h1>
        </div>
        <div className="years">
          <ul>
            {years.map((year) => (
              <li key={year.id} onClick={handleClick}>{year.yearStart} - {year.yearEnd}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default changeYear;
