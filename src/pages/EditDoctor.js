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
import swal from 'sweetalert';
import axios from '../axios/axios';
import { useHistory, useParams } from 'react-router';

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

export default function EditDoctor() {
  const classes = UseStyles();
  const [rows, setRows] = useState([]);
  const [doctor, setDoctor] = useState({
    name : '',
    email : '',
    speciality : '',
    image_url : ''
  })

  const [practice, setPractice] = useState({
    day: '',
    start : '',
    end :  ''
  })

  const history = useHistory();
  const params = useParams();

  useEffect(() => {
    axios({
      method : 'GET',
      url: '/accounts/' + params.id,
      headers : {
        access_token : localStorage.getItem('access_token')
      }
    })
      .then(accountsAxio => {
        let accounts = accountsAxio.data;
        let getAccount = {
          name : accounts.name,
          email : accounts.email,
          speciality : accounts.speciality.join(', '),
          image_url : accounts.image_url
        }
        setDoctor(getAccount);
        setRows(accounts.practice);
      })
      .catch(err => {
        console.log(err);
      })
  }, [params.id])


  function handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newPractice = { ...practice, [name]: value }
    setPractice(newPractice);
  }

  function handleDoctorChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    const newDoctor = { ...doctor, [name]: value }
    setDoctor(newDoctor);
  }

  function submitDoctor (event) {
    event.preventDefault();

    let submitData = doctor;
    submitData.speciality = submitData.speciality.split(',')
    submitData.practice = rows;
    submitData.role = 'Doctor';

    axios({
      method : 'PUT',
      url: '/accounts/' + params.id,
      data : submitData,
      headers : {
        access_token : localStorage.getItem('access_token')
      }
    })
      .then(accounts => {
        swal("Success edit doctor", "Doctor edited!", "success");
        history.push('/doctors');
      })
      .catch(err => {
        console.log(err);
      })
  }

  function addPractice (event) {
    event.preventDefault();

    let newRows = rows.concat(practice);
    setRows(newRows);
  }

  function deletePractice (index) {
    let newRows = rows.filter((row, indexRow) => indexRow !== index);
    setRows(newRows);
  }

  return (
    <Container className={ classes.root }>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <Container style={{width: "60%", border: "1"}}>
            <h3 style={{textAlign: "center"}}>Edit Doctor</h3>
            <form onSubmit = { submitDoctor }>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              value = { doctor.name }
              onChange = { handleDoctorChange }
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              value = { doctor.email }
              onChange = { handleDoctorChange }
            />
            <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="speciality"
            label="Speciality"
            name="speciality"
            value = { doctor.speciality }
            onChange = { handleDoctorChange }
            
          />
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="image_url"
          label="Image Url"
          name="image_url"
          value = { doctor.image_url }
          onChange = { handleDoctorChange }
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
          <form noValidate onSubmit = { addPractice }>

          <InputLabel id="demo-simple-select-label">Day</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={ handleChange }
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
          
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="start"
          type="time"
          id="start"
          value = { practice.start }
          onChange = { handleChange }
          
        /> 
          <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="end"
          type="time"
          id="end"
          value = { practice.end }
          onChange = { handleChange }
          
        /> 
          
        <br></br>

        <Button
          type="submit"
          fullWidth
          variant="contained"
          style={{backgroundColor: "#1de9b6", marginBottom : 30 }}
         
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
              <TableCell align="left" className= { classes.header }>Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={ index }>
                <TableCell component="th" scope="row"> { row.day } </TableCell>
                <TableCell align="left">{ row.start }</TableCell>
                <TableCell align="left">{ row.end }</TableCell>
                <Button variant="contained" color="secondary" style = {{color: "black"}} onClick = { () => deletePractice(index) }>Delete</Button>
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
