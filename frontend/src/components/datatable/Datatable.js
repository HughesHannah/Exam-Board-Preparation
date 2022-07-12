import React, { Component } from 'react'
import "./datatable.scss"

import { DataGrid } from '@mui/x-data-grid';
import { gotColumns, gotRows } from "../../Datatablesource.js";


const Datatable = () => {

  const actionColumn = [
    { 
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: () => {
        return (
          <div className="cellAction">
          <div className="viewButton">
            View
          </div>
        </div>
        )
        
      }
    }
  ]

  return (
    <div className="datatable"><DataGrid
    rows={gotRows}
    columns={gotColumns.concat(actionColumn)}
    pageSize={9}
    rowsPerPageOptions={[9]}
    checkboxSelection
    /></div>
  )
}

export default Datatable

