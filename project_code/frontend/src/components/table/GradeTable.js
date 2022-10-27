import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {values} from "../../utils/GradeConversion.js"


export default function GradeTable() {
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
