import React, { useEffect, useState } from 'react'
import { Container, TextField, Button } from '@material-ui/core'
import swal from 'sweetalert';
import { useHistory, useParams } from 'react-router';

export default function AddMedicine() {
  const [medicine, setMedicine] = useState({
    name: '',
    description: '',
    stock: ''
  })

  const params = useParams();
  const history = useHistory();

  useEffect(() => {
    fetch('http://localhost:3001/medicines/' + params.id)
        .then(res => res.json())
        .then(result => {
          let getMedicine = {
            name : result.name,
            description : result.description,
            stock : result.stock
          }
          setMedicine(getMedicine);
        })
  }, [])

  function handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newMedicine = { ...medicine, [name] : value };

    setMedicine(newMedicine);
  }

  const requestOptions = {
    method: 'PUT',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(medicine) 
  }

  function handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:3001/medicines/' + params.id, requestOptions)
      .then(response => response.json())
      .then(data => {
        swal("Success edit medicine", "Medicine edited!", "success");
        history.push('/medicines');
      })
  }

  return (
    <Container style={{width: "60%", border: "1"}}>
      <h3 style={{textAlign: "center"}}>Edit Medicine</h3>
      <form noValidate onSubmit = { handleSubmit }>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
          value = { medicine.name }
          onChange = { handleChange }
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="description"
          label="Description"
          name="description"
          value = { medicine.description }
          onChange = { handleChange }
        />
        <TextField
          type="number"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="stock"
          label="Stock"
          name="stock"
          value = { medicine.stock }
          onChange = { handleChange }
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
  )
}
