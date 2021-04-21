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
import { useHistory, useParams } from 'react-router';
import axios from '../axios/axios';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import swal from 'sweetalert';

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

export default function AddOrders() {
  const classes = UseStyles();
  const params = useParams();
  const history = useHistory();

  const [patient, setPatient] = useState({
    name : '',
    age : '',
    gender : '',
    comorbid : []
  });

  const [alert, setAlert] = useState(false);

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

  const [disease, setDisease] = useState([]);

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
      name : event.name,
      stock : event.stock
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

    if (selectMedicine.stock >= formAddOrders.totalMedicine) {
      setAlert(false);
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
    else {
      setAlert(true);
      let newForm = {...formAddOrders, totalMedicine : selectMedicine.stock };
      setFormAddOrders(newForm);
    }
  }

  function deleteMedic (indexList) {
    let newRow = rows.filter((row,index) => index !== indexList);
    setRows(newRow);
  }

  function handleDiseaseChange (event) {
    event.preventDefault();

    let newDisease = event.target.value;
    setDisease(newDisease);
  }

  function postOrders (object) {
    axios({
      method : 'POST',
      url: '/orders/' + params.id,
      headers : {
        access_token : localStorage.getItem('access_token')
      },
      data : object
    })
      .then(res => {
        swal("Success Create orders", "Orders added!", "success");
        history.push('/appointments');
      })
      .catch(err => {
        console.log(err);
      })
  }

  function submitForm (event) {
    event.preventDefault();

    let newOrders = {
      medicines : rows,
      diseases : disease.split(';').map(e => e.trim())
    }
    postOrders(newOrders);
  }

  const filterOptions = createFilterOptions({
    limit: 10
  });

  return (
    <Container className={classes.root}>
      <Grid container spacing={3}>
          <Grid item xs={4} >
            <h3>Name : { patient.name }</h3>
            <h3>Age : { patient.age } y.o</h3>
            <h3>Gender : {patient.gender }</h3>
            <h3>Comorbid: { patient.comorbid.join(', ') }</h3>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="disease"
              label="Separate disease by ; (example: flu;alergy)"
              name="disease"
              onChange = { (e) => handleDiseaseChange(e) }
            />
            <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{backgroundColor: "#1de9b6"}}
            onClick = { e => submitForm(e) }
          >
            Submit
          </Button>
          </Grid>
       
        <Grid item xs={8} >
          <Container style={{width: "60%", border: "1"}}>
            <h3 style={{textAlign: "center"}}>List of Medicines</h3>
            <form onSubmit = { (e) => handleAddMedic(e) }>
            <Autocomplete
            id="combo-box-demo"
            options={ medicines }
            filterOptions = { filterOptions }
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
             {
               alert &&
               <div class="alert">
                  <span class="closebtn" onClick = { () => setAlert(false) } >&times;</span>
                  Not enough medicine stock
                </div>
             }
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="totalMedicine"
                label="Total Medicines"
                name="totalMedicine"
                type = "number"
                value = { formAddOrders.totalMedicine }
                inputProps = {{
                  min : 0
                }}
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
                    <Button variant="contained" color = "secondary" onClick = { () => deleteMedic(index) }>Delete</Button>
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
