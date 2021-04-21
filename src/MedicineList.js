import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

const rows = [
  createData('Marks', "Otto", "Orthopedy", "Monday", "10.00-15.00" ),
  createData('Jacob', "Thornton", "Skin", "Monday", "15.00-18.00"),
  createData('Larry', "Larry", "eye", "Saturday", "08.00-12.00"),
  createData('Larry', "Larry", "eye", "Sunday", "08.00-12.00"),
];

const medic = { "medicines" : [
  {
      "id" : "1",
      "name" : "panadol",
      "description" : "sakit kepala",
      "stock" : 900
  },
  {
      "id" : "2",
      "name" : "vitamin D",
      "description" : "vitamin",
      "stock" : 3
  },
  {
      "id" : "3",
      "name" : "sakatonik",
      "description" : "vitamin",
      "stock" : 0
  }
  ]
}

export default function MedicineList() {
  const classes = useStyles();
  const [medicine, setMedicine] = useState(medic.medicines);
  
  useEffect(() => {
    console.log('ayam');
  })

  return (
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
            <TableRow key={ row.name }>
              <TableCell align="center"> { index + 1 } </TableCell>
              <TableCell component="th" scope="row"> { row.username } </TableCell>
              <TableCell align="left">{ row.name }</TableCell>
              <TableCell align="left">{ row.specialty }</TableCell>
              <TableCell align="left">{ row.availableDay }</TableCell>
              <TableCell align="left">{ row.availableTime }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
