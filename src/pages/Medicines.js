import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import { Container } from '@material-ui/core';
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold",
  }
});

function createData(name, description, stock) {
  return { name, description, stock };
}

const rows = [
  createData('Panadol', "Boost imunity", "10" ),
  createData('Antangin', "Help cure disease", "20"),
  createData('Diapet', "Maintain health", "5"),
];

export default function Medicines() {
  const classes = useStyles();
  const history = useHistory()

  const addMedicine = () => {
    history.push('/addMedicine')
  }

  return (
    <Container>
    <h3> List of all medicines </h3>
    <div style={{float: "right", marginBottom: "10px"}}>
      <Button
        variant="contained"
        style={{backgroundColor: "#1de9b6", textAlign: "right"}}
        onClick={() => addMedicine()}
      >
        Add Medicine
      </Button>
    </div>
    <TableContainer component={Paper}>
      <Table className={ classes.table } aria-label="simple table">
        <TableHead className = { classes.header }>
          <TableRow fontWeight="fontWeightBold">
            <TableCell align="center"> No </TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="left">Stock</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={ row.name }>
              <TableCell align="center"> { index + 1 } </TableCell>
              <TableCell component="th" scope="row"> { row.name } </TableCell>
              <TableCell align="left">{ row.description }</TableCell>
              <TableCell align="left">{ row.stock }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
