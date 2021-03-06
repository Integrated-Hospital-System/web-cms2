import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Button } from "@material-ui/core";
import swal from 'sweetalert';
import axios from '../axios/axios';
import { useHistory } from "react-router";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  },
  header: {
    fontWeight: "bold"
  },
});

export default function Row(props) {
  const { row, filterIdDoctor, asal } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();
  const history = useHistory();

  function changeFilter (id) {
    filterIdDoctor(id);
  }

  function deleteDoctor (id) {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this doctor!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        axios({
          method : 'DELETE',
          url: '/accounts/' + id,
          headers : {
            access_token : localStorage.getItem('access_token')
          }
        })
          .then(({ data }) => {
            swal("Poof! Your doctor has been deleted!", {
              icon: "success",
            });
            changeFilter(id);
          })
          .catch(err => {
            console.log(err);
          })
      } else {
        swal("Your Doctor is safe!");
      }
    });
  }

  function editDoctor (id) {
    history.push('editDoctor/' + id);
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
        {
          row.role === 'Doctor' &&
          <TableCell align="left">{ row.speciality.join(', ') }</TableCell>
        }
        <TableCell align="left">
          <Button variant="contained" color="primary" style= {{marginRight: 30}} onClick = { () => editDoctor(row._id) }>Edit</Button>
          {
            asal !== 'home' && <Button variant="contained" color="secondary" onClick = { () => deleteDoctor(row._id) }>Delete</Button>
          }
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
                    <TableCell align="left" className= { classes.header }>Day</TableCell>
                    <TableCell align="left" className= { classes.header }>Start</TableCell>
                    <TableCell align="left" className= { classes.header }>End</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { row.role === 'Doctor' && row.practice.map((historyRow) => (
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