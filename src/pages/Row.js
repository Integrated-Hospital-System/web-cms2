import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Button, Icon } from "@material-ui/core";
import Delete, { DeleteIcon } from '@material-ui/icons/Delete';
import swal from 'sweetalert';
import axios from '../axios/axios';
import { useHistory } from "react-router";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  }
});

export default function Row(props) {
  const { row, filterIdDoctor } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  function changeFilter (id) {
    filterIdDoctor(id);
  }

  function deleteDoctor (id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this medicines!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios({
          method : 'DELETE',
          url: '/accounts/' + id
        })
          .then(({ data }) => {
            swal("Poof! Your medicines has been deleted!", {
              icon: "success",
            });
            changeFilter(id);
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        swal("Your medicines is safe!");
      }
    });
  }

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
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
          {row.email}
        </TableCell>
        <TableCell align="left">{row.name}</TableCell>
        <TableCell align="left">{ row.speciality.join(', ') }</TableCell>
        <TableCell align="left">
          <Button variant="contained" color="primary" style= {{marginRight: 30}}>Edit</Button>
          <Button variant="contained" color="secondary" onClick = { () => deleteDoctor(row.id) }>Delete</Button>
        </TableCell>

        </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Practice
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left">Day</TableCell>
                    <TableCell align="left">Start</TableCell>
                    <TableCell align="left">End</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.practice.map((historyRow) => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.day}
                      </TableCell>
                      <TableCell>{historyRow.start}</TableCell>
                      <TableCell align="left">{historyRow.end}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )

}