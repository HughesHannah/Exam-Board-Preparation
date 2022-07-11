
import React, { useState, useEffect } from 'react'
import { variables } from '../../Variables.js';
import { DataGrid } from '@mui/x-data-grid'

const columns = [
  { field: 'id', headerName: 'ID' },
  { field: 'DepartmentName', headerName: 'Title', width: 300 },
]

const StudentTable2 = () => {

    const [tableData, setTableData] = useState([])

    useEffect(() => {
        fetch(variables.API_URL+'department')
          .then((data) => data.json())
          .then((data) => setTableData(data))
      }, [])
       console.log(tableData)

  return (
    <div style={{ height: 700, width: '100%' }}>
<DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        checkboxSelection
      />

    </div>
  )
}

export default StudentTable2