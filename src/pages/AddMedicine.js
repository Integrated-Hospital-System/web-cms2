import React, { useState } from 'react'
import { Container, TextField, Button } from '@material-ui/core'
import swal from 'sweetalert';

export default function AddMedicine() {
  const [medicine, setMedicine] = useState({
    name: '',
    description: '',
    stock: ''
  })

  function handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newMedicine = { ...medicine, [name] : value };

    setMedicine(newMedicine);
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type' : 'application/json' },
    body: JSON.stringify(medicine) 
  }

  function handleSubmit (event) {
    event.preventDefault();
    fetch('http://localhost:3001/medicines', requestOptions)
      .then(response => response.json())
      .then(data => swal("Success add medicine", "Medicine added!", "success"))
  }

  return (
    <Container style={{width: "60%", border: "1"}}>
      <h3 style={{textAlign: "center"}}>Add Medicine</h3>
      <form noValidate onSubmit = { handleSubmit }>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="name"
          label="Name"
          name="name"
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
