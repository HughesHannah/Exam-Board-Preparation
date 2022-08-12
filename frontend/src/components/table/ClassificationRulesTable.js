import React from "react";
import Tooltip from "@mui/material/Tooltip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function ClassificationRulesTable({classifications}) {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="center">Standard Lower GPA</TableCell>
            <TableCell align="center">Discretionary Lower GPA</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {classifications.map((classification) => (
            <TableRow key={classification.id}>
              <TableCell align="left">
                {classification.classificationName}
              </TableCell>
              <TableCell align="center">
                {classification.lowerGPAStandard.toFixed(1)}
              </TableCell>
              <Tooltip
                title={
                  "min. " +
                  classification.percentageAboveForDiscretionary +
                  "% credits at band " +
                  classification.charBandForDiscretionary
                }
              >
                <TableCell align="center">
                  {classification.lowerGPADiscretionary.toFixed(1)}
                </TableCell>
              </Tooltip>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
