import React from 'react'
import { 
  Container, 
  Grid, 
  TableContainer, 
  Table, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableBody, 
  Paper,
  TextField,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const UseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function createData(medicine, timesperday, doses, total) {
  return { medicine, timesperday, doses, total };
}

const rows = [
  createData('Panadol', "2", "1", "10"),
  createData('Rhinos', "2", "2", "15"),
];


export default function addOrders() {
  const classes = UseStyles();

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={6} >
          <h2>Name : Budi</h2>
          <h2>Age : 30 y.o</h2>
          <h2>Gender : Male</h2>
          <h2>Comorbid: Gerd, Headache</h2>
        </Grid>
        <Grid item xs={6} >
          <Container style={{width: "60%", border: "1"}}>
            <h3 style={{textAlign: "center"}}>Add Orders</h3>
            <form noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="medicine"
                label="Medicine"
                name="medicine"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="timesperday"
                label="Times per Day"
                name="timesperday"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="doses"
                label="Doses"
                name="doses"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="total"
                label="Total Medicines"
                name="total"
              />
              <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="note"
              label="Notes"
              name="notes"
            />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                style={{backgroundColor: "#1de9b6"}}
              >
                Submit
              </Button>
            </form>
          </Container>
          <br></br>
          <TableContainer component={Paper}>
            <Table className={ classes.table } aria-label="simple table">
              <TableHead className = { classes.header }>
                <TableRow fontWeight="fontWeightBold">
                  <TableCell align="center"> No </TableCell>
                  <TableCell align="left">Medicine</TableCell>
                  <TableCell align="left">Times per Day</TableCell>
                  <TableCell align="left">Doses</TableCell>
                  <TableCell align="left">Total Medicines</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={ row.name }>
                    <TableCell align="center"> { index + 1 } </TableCell>
                    <TableCell component="th" scope="row"> { row.medicine } </TableCell>
                    <TableCell align="left">{ row.timesperday }</TableCell>
                    <TableCell align="left">{ row.doses }</TableCell>
                    <TableCell align="left">{ row.total }</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </Container>
  )
}
