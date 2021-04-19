import React, { useEffect, useState } from 'react'
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
import { useParams } from 'react-router';
import axios from '../axios/axios';
import Autocomplete from '@material-ui/lab/Autocomplete';

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


export default function AddOrders() {
  const classes = UseStyles();
  const params = useParams();
  const [patient, setPatient] = useState({
    name : '',
    age : '',
    gender : '',
    comorbid : []
  });

  const [rows, setRows] = useState([]);

  const [formAddOrders, setFormAddOrders] = useState({
    timesPerDay : '',
    doses : '',
    totalMedicine : '',
  });

  const [medicines, setMedicines] = useState([]);

  const [selectMedicine, setSelectMedicine] = useState({
    medicineId : '',
    name : ''
  });

  const getPatientId = async () => {
    const patient = await axios({
      method : 'GET',
      url: '/appointments/' + params.id,
      headers : {
        access_token : localStorage.getItem('access_token')
      }
    })
    getPatient(patient.data.patient);
  };

  const getPatient = async (id) => {
    const patient = await axios({
      method : 'GET',
      url: '/accounts/' + id,
      headers : {
        access_token : localStorage.getItem('access_token')
      }
    })
    const newPatient = {
      name : patient.data.name,
      age : patient.data.age,
      gender : patient.data.gender,
      comorbid : patient.data.comorbid
    }
    setPatient(newPatient);
  };

  const getMedicines = async () => {
    const medicines =  await axios({
      method : 'GET',
      url : '/medicines',
      headers : {
        access_token : localStorage.getItem('access_token')
      }
    })
    setMedicines(medicines.data);
  };

  useEffect(() => {
    try {
      getPatientId();
      getMedicines();
    } catch (err) {
      console.log(err);
    }
  }, [params.id]);

  function medicineChange (event) {
    let object = {
      medicineId : event._id,
      name : event.name
    }
    setSelectMedicine(object);
  }

  function handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newForm = {...formAddOrders, [name] : value };
    setFormAddOrders(newForm);
  }

  function handleAddMedic (event) {
    event.preventDefault();

    let newMedicList = {
      medicineId : selectMedicine.medicineId,
      name : selectMedicine.name,
      timesPerDay : formAddOrders.timesPerDay,
      doses : formAddOrders.doses,
      totalMedicine : formAddOrders.totalMedicine
    }

    let object = rows.concat(newMedicList);
    setRows(object);
  }

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
          <Grid item xs={4} >
            <h3>Name : { patient.name }</h3>
            <h3>Age : { patient.age } y.o</h3>
            <h3>Gender : {patient.gender }</h3>
            <h3>Comorbid: { patient.comorbid.join(', ') }</h3>

          </Grid>
       
        <Grid item xs={8} >
          <Container style={{width: "60%", border: "1"}}>
            <h3 style={{textAlign: "center"}}>Add Orders</h3>
            <form noValidate  onSubmit = { (e) => handleAddMedic(e) }>
            <Autocomplete
            id="combo-box-demo"
            options={ medicines }
            getOptionLabel={ (option) => option.name }
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Medicines" variant="outlined" />}
            onChange = { (event, newValue) => { medicineChange(newValue)} }
            />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="timesperday"
                label="Times per Day"
                name="timesPerDay"
                onChange = { (e) => handleChange(e) }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="doses"
                label="Doses"
                name="doses"
                onChange = { (e) => handleChange(e) }
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="totalMedicine"
                label="Total Medicines"
                name="totalMedicine"
                onChange = { (e) => handleChange(e) }
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color = "primary"
              >
                Add Medicines
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
                  <TableCell align="left">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row, index) => (
                  <TableRow key={ row.name }>
                    <TableCell align="center"> { index + 1 } </TableCell>
                    <TableCell component="th" scope="row"> { row.name } </TableCell>
                    <TableCell align="left">{ row.timesPerDay }</TableCell>
                    <TableCell align="left">{ row.doses }</TableCell>
                    <TableCell align="left">{ row.totalMedicine }</TableCell>
                    <Button variant="contained" color = "secondary" >Delete</Button>
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
