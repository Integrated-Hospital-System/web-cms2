import React, { useEffect, useState } from 'react';
import { Container, TextField, Button, Grid, TableContainer, Table, TableHead, TableRow, TableBody, TableCell, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  MuiPickersUtilsProvider,
  TimePicker
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const UseStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  header: {
    fontWeight: "bold"
  },
}));

export default function AddDoctor() {
  const classes = UseStyles();
  const [rows, setRows] = useState([]);
  const [practice, setPractice] = useState({
    day: '',
    start : new Date(),
    end : new Date()
  })

  function handleChange(event) {
    console.log(event);
  }

  function setStart (event) {
    let newTime = { ...practice, start : event };
    setPractice(newTime);
  }

  return (
    <Container className={ classes.root }>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Container style={{width: "60%", border: "1"}}>
            <h3 style={{textAlign: "center"}}>Add Doctor</h3>
            <form noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="age"
              label="Age"
              name="age"
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="gender"
              label="Gender"
              name="gender"
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="specialty"
            label="Specialty"
            name="specialty"
          />
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="image_url"
          label="Image Url"
          name="image_url"
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
        </Grid>
      <Grid item xs={ 6 }>
        <Container style={{width: "60%", border: "1"}}>
          <h3 style={{textAlign: "center"}}>Practice</h3>
          <form noValidate>

          <InputLabel id="demo-simple-select-label">Day</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleChange}
            value = { practice.day }
            name = "day"
          >
            <MenuItem value={ 'Sunday' }>Sunday</MenuItem>
            <MenuItem value={ 'Monday' }>Monday</MenuItem>
            <MenuItem value={ 'Tuesday' }>Tuesday</MenuItem>
            <MenuItem value={ 'Wednesday' }>Wednesday</MenuItem>
            <MenuItem value={ 'Thursday' }>Thursday</MenuItem>
            <MenuItem value={ 'Friday' }>Friday</MenuItem>
            <MenuItem value={ 'Saturday' }>Saturday</MenuItem>

          </Select>
          <br></br>

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <TimePicker value = { practice.start } onChange={ (newValue) => setStart(newValue) } name="start" label= "start" style={{marginTop : 20}} />
            <TimePicker onChange={handleChange} name="end" label= "end" style={{marginTop : 20, marginBottom: 20}} />
          </MuiPickersUtilsProvider>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: "#1de9b6"}}
          >
            Add Practice
          </Button>
        </form>        
        </Container>
        <br></br>
        <TableContainer component={Paper}>
        <Table className={ classes.table } aria-label="simple table">
          <TableHead className = { classes.header }>
            <TableRow fontWeight="fontWeightBold">
              <TableCell align="left" className= { classes.header }>Day</TableCell>
              <TableCell align="left" className= { classes.header }>Start</TableCell>
              <TableCell align="left" className= { classes.header }>End</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={ index }>
                <TableCell component="th" scope="row"> { row.day } </TableCell>
                <TableCell align="left">{ row.start }</TableCell>
                <TableCell align="left">{ row.end }</TableCell>
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
