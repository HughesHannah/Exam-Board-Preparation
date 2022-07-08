import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { DataGrid } from '@mui/x-data-grid';

function createData(matriculation, credits, class1, class2, class3) {
  return { matriculation, credits, class1, class2, class3 };
}

function createColumns(field, headerName, width){
  return { field, headerName, width };
}

const rows = [
  createData('1111111', 159, 6.0, 4, 4.0),
  createData('2222222', 237, 9.0, 7, 4.3),
  createData('3333333', 262, 16.0, 4, 6.0),
  createData('4444444', 305, 3.7, 7, 4.3),
  createData('5555555', 356, 16.0, 9, 3.9),
];

const columns = [
  createColumns('matriculation', 'Matriculation', 100),
  createColumns('credits', 'Credits', 100),
  createColumns('class1', 'Class 1', 100),
  createColumns('class2', 'Class 2', 100),
  createColumns('class3', 'Class 3', 100),
]

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Matriculation</TableCell>
            <TableCell align="right">Credits</TableCell>
            <TableCell align="right">Class 1</TableCell>
            <TableCell align="right">Class 2</TableCell>
            <TableCell align="right">Class 3</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.matriculation}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.matriculation}
              </TableCell>
              <TableCell align="right">{row.credits}</TableCell>
              <TableCell align="right">{row.class1}</TableCell>
              <TableCell align="right">{row.class2}</TableCell>
              <TableCell align="right">{row.class3}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

// export default function DataTable() {
  
//   return (
//     <div style={{ height: 400, width: '100%' }}>
//       <DataGrid
//         rows={rows}
//         columns={columns}
//         pageSize={5}
//         rowsPerPageOptions={[5]}
//         checkboxSelection
//       />

//       {/* {console.log(rows)}
//       {console.log(columns)} */}
//     </div>
//   );
// }