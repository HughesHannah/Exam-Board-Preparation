import "./comments.scss";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { variables } from "../../Variables";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

function createData(id, description, date, user, comment) {
  return {
    id,
    description,
    date,
    user,
    comment,
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.description}
        </TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.user}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography className="commentfield">{row.comment}</Typography>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}


function getCommentTable(rows, comments){
  if(comments.length != 0){
    return (
      <TableContainer component={Paper}>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Description</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">User</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <Row key={row.id} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>)
    }else {return (<p>no comments</p>)}
};

export default function CollapsibleTable() {
  const [comments, setComments] = useState([]);
  const [rows, setRows] = useState([]);
  const path = useParams();

  useEffect(() => {
    fetch(
      variables.API_URL + "individualStudentAPI/" + path.studentID + "/comments"
    )
      .then((data) => data.json())
      .then((data) => setComments(data));
  }, []);

  useEffect(() => {
    if (comments.length > 0) {
      comments.forEach(
        (comment) =>
          (setRows([
            ...rows,
            {
              id: comment.id,
              description: comment.subjectLine,
              date: Date(comment.date),
              user: comment.user.first_name,
              comment: comment.comment,
            },
          ]))
      );
    }
  }, [comments]);

  

  return (
    <div>{getCommentTable(rows, comments)}</div>
  )
}
