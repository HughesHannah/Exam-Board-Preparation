import React from "react";
import "./export.scss";

import TransferList from "../../components/TransferList/TransferList.js";
import Sidebar from "../../components/sidebar/Sidebar.js";

const Export = () => {
  return (
    <div className="export">
      <Sidebar />
      <div className="mainContainer">
        <h3 className="title">Export</h3>
        <div className="transferSection">
          <div className="titleOfSection">Things to Export</div>
          <TransferList />
        </div>
      </div>
    </div>
  );
};

export default Export;
