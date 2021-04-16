import React from 'react'
import { Container, TextField, Button } from '@material-ui/core'

export default function addMedicine() {
  return (
    <Container style={{width: "60%", border: "1"}}>
      <h3 style={{textAlign: "center"}}>Add Medicine</h3>
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
          id="description"
          label="Description"
          name="description"
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
