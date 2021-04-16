import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Container } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold",
  }
});

function createData(username, name, specialty, availableDay, availableTime) {
  return { username, name, specialty, availableDay, availableTime };
}

// const rows = [
//   createData('Mark', "Otto", "Orthopedy", "Monday", "10.00-15.00" ),
//   createData('Jacob', "Thornton", "Skin", "Monday", "15.00-18.00"),
//   createData('Larry', "Larry", "eye", "Saturday", "08.00-12.00"),
//   createData('Larry', "Larry", "eye", "Sunday", "08.00-12.00"),
// ];

export default function Home() {
  const classes = useStyles();

  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/accounts')
        .then(res => res.json())
        .then(result => {
            let dokter = result.filter(dok => dok.role === "doctor")
            let kumpulanPraktek = [];
            dokter.forEach(element => {
              element.practice.forEach(jadwal => {
                let object = { ...element, practice : jadwal }
                kumpulanPraktek.push(object);
              });
            });
            setRows(kumpulanPraktek);
        })
  }, [])

  return (
    <Container>
    <h3> List of all doctors </h3>

    <TableContainer component={Paper}>
      <Table className={ classes.table } aria-label="simple table">
        <TableHead className = { classes.header }>
          <TableRow fontWeight="fontWeightBold">
            <TableCell align="center"> No </TableCell>
            <TableCell align="left">Username</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Specialty</TableCell>
            <TableCell align="left">Available Day</TableCell>
            <TableCell align="left">Available Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={ index }>
              <TableCell align="center"> { index + 1 } </TableCell>
              <TableCell component="th" scope="row"> { row.username } </TableCell>
              <TableCell align="left">{ row.name }</TableCell>
              <TableCell align="left">{ row.speciality.join(' ') }</TableCell>
              <TableCell align="left">{ row.practice.day }</TableCell>
              <TableCell align="left">{ row.practice.start } - { row.practice.end }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
