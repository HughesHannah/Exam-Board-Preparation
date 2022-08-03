import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import {values} from "../../utils/GradeConversion.js"

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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align = "center">Percentage Range</TableCell>
            <TableCell align = "center">Band</TableCell>
            <TableCell align = "center">Point</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {values.map((value) => (
            <TableRow
              key={value.minValue}
            >
              <TableCell align = "center">{value.minValue} - {value.maxValue}%</TableCell>
              <TableCell align = "center">{value.band}</TableCell>
              <TableCell align = "center">{value.point}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
