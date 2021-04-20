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
import axios from '../axios/axios';
import Loading from './Loading';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold",
  },
});

export default function Appointments() {
  const classes = useStyles();
  const history = useHistory();
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    setLoading(true);
    axios({
      method: 'GET',
      url : '/appointments',
      headers : {
        access_token : localStorage.getItem('access_token')
      }
    })
      .then(result => {
        result = result.data;
        let completedFalse = result.filter(result => result.isCompleted === false); 
        let recentAppointment = completedFalse.filter(appointment => appointment.appointmentDate > new Date().toISOString());         
        setRows(recentAppointment);
      })
      .catch (err => {
        console.log(err);
      })
      .finally(_ => {
        setLoading(false);
      })
  }, [])

  const addOrders = (id) => {
    history.push('/addOrders/' + id);
  }

  if (loading) {
    return (
      <Loading></Loading>
    )
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
            <TableCell align="left" className= { classes.header }>Appointment Date</TableCell>
            <TableCell align="left" className= { classes.header }></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={ row.id }>
              <TableCell align="center"> { index + 1 } </TableCell>
              <TableCell component="th" scope="row"> { row.patient.name } </TableCell>
              <TableCell align="left">{ row.patient.age }</TableCell>
              <TableCell align="left">{ row.patient.gender }</TableCell>
              <TableCell align="left">{ row.patient.comorbid }</TableCell>
              <TableCell align="left">{ row.appointmentDate.substring(0, 10) }</TableCell>
              <TableCell align="left"> 
                <Button variant="contained" style={{backgroundColor: "#1de9b6"}} onClick={ () => addOrders(row._id) }>
                  Process
                </Button> 
                
              </TableCell>
                
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
