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
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold"
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#00F6B5',
    color: '#3075B5'
  }
});

export default function Doctors() {
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

  const history = useHistory();

  function addDoctor () {
    history.push('/addDoctor');
  }

  return (
    <Container>
    <h3> List of all doctors </h3>
    <Button variant="contained" color="primary" className = { classes.addButton } onClick = {() => addDoctor() }>Add New Doctor</Button>
    <TableContainer component={Paper}>
      <Table className={ classes.table } aria-label="simple table">
        <TableHead >
          <TableRow>
              <TableCell align="center" className= { classes.header }> No </TableCell>
              <TableCell align="left" className= { classes.header }>Email</TableCell>
              <TableCell align="left" className= { classes.header }>Name</TableCell>
              <TableCell align="left" className= { classes.header }>Specialty</TableCell>
              <TableCell align="left" className= { classes.header }>Available Day</TableCell>
              <TableCell align="left" className= { classes.header }>Available Time</TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={ index }>
              <TableCell align="center"> { index + 1 } </TableCell>
              <TableCell component="th" scope="row"> { row.email } </TableCell>
              <TableCell align="left">{ row.name }</TableCell>
              <TableCell align="left">{ row.speciality.join(', ') }</TableCell>
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
