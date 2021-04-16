import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold",
  }
});

function createData(name, age, gender, comorbid) {
  return { name, age, gender, comorbid };
}

const rows = [
  createData('Mark', 25, "Male", "Mag" ),
  createData('Jacob', 28, 'Male', 'Diabetes'),
  createData('Larry', 30, "Female", "High blood"),
];

export default function Appointments() {
  const classes = useStyles();

  return (
    <Container>
    <h3> List of all appoinment </h3>

    <TableContainer component={Paper}>
      <Table className={ classes.table } aria-label="simple table">
        <TableHead className = { classes.header }>
          <TableRow fontWeight="fontWeightBold">
            <TableCell align="center"> No </TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Age</TableCell>
            <TableCell align="left">Gender</TableCell>
            <TableCell align="left">Comorbid</TableCell>
            <TableCell align="left"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={ row.name }>
              <TableCell align="center"> { index + 1 } </TableCell>
              <TableCell component="th" scope="row"> { row.name } </TableCell>
              <TableCell align="left">{ row.age }</TableCell>
              <TableCell align="left">{ row.gender }</TableCell>
              <TableCell align="left">{ row.comorbid }</TableCell>
              <TableCell align="left"> 
                <Button variant="contained" color="primary">
                Process
                </Button> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
