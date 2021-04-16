import React from 'react'
import { Container, TextField, Button } from '@material-ui/core'

export default function addDoctor() {
  return (
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
