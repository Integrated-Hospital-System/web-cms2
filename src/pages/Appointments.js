import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Button, Container } from '@material-ui/core';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold",
  },
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
  const history = useHistory();
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/appointments')
        .then(res => res.json())
        .then(result => {
          let completedFalse = result.filter(result => result.isCompleted === false);
          let patient = completedFalse.map(result => result.patient);
          setRows(patient);
        })
  }, [])

  const addOrders = () => {
    history.push('/addOrders')
  }

  return (
    <Container>
    <h3> List of all appoinment </h3>

    <TableContainer component={Paper}>
      <Table className={ classes.table } aria-label="simple table">
        <TableHead className = { classes.header }>
          <TableRow fontWeight="fontWeightBold">
            <TableCell align="center" className= { classes.header }> No </TableCell>
            <TableCell align="left" className= { classes.header }>Name</TableCell>
            <TableCell align="left" className= { classes.header }>Age</TableCell>
            <TableCell align="left" className= { classes.header }>Gender</TableCell>
            <TableCell align="left" className= { classes.header }>Comorbid</TableCell>
            <TableCell align="left" className= { classes.header }></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={ row.id }>
              <TableCell align="center"> { index + 1 } </TableCell>
              <TableCell component="th" scope="row"> { row.name } </TableCell>
              <TableCell align="left">{ row.age }</TableCell>
              <TableCell align="left">{ row.gender }</TableCell>
              <TableCell align="left">{ row.comorbid }</TableCell>
              <TableCell align="left"> 
                <Button variant="contained" style={{backgroundColor: "#1de9b6"}} onClick={() => addOrders()}>
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
