import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(band, gp, upperp, lowerp) {
  return { band, gp, upperp, lowerp };
}

const rows = [
  createData("A1", 22, 100, 92),
  createData("A2", 21, 91, 85),
  createData("A3", 20, 84, 79),
  createData("A4", 19, 78, 74),
  createData("A5", 18, 73, 70),
  createData("B1", 17, 69, 67),
  createData("B2", 16, 66, 64),
  createData("B3", 15, 63, 60),
  createData("C1", 14, 59, 57),
  createData("C2", 13, 56, 54),
  createData("C3", 12, 53, 50),
  createData("D1", 11, 49, 47),
  createData("D2", 10, 46, 44),
  createData("D3", 9, 43, 40),
  createData("E1", 8, 39, 37),
  createData("E2", 7, 36, 34),
  createData("E3", 6, 33, 30),
  createData("F1", 5, 29, 27),
  createData("F2", 4, 26, 24),
  createData("F3", 3, 23, 20),
  createData("G1", 8, 19, 15),
  createData("G2", 7, 14, 10),
  createData("H", 6, 9, 0),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Band</TableCell>
            <TableCell align="right">Grade Point</TableCell>
            <TableCell align="right">Upper Percentage</TableCell>
            <TableCell align="right">Lower Percentage</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.band}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.band}
              </TableCell>
              <TableCell align="right">{row.gp}</TableCell>
              <TableCell align="right">{row.upperp}</TableCell>
              <TableCell align="right">{row.lowerp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
