import React from "react";
import "./list.scss";

import Datatable from "../../components/datatable/Datatable.js";
import Sidebar from "../../components/sidebar/Sidebar.js";

const List = () => {
  return (
    <div className="list">
      <Sidebar />
      <div className="mainContainer">
        <div className="title">
          <h2>Title of Table</h2>
        </div>
        <div className="table">
          <Datatable />
        </div>
      </div>
    </div>
  );
};

export default List;
