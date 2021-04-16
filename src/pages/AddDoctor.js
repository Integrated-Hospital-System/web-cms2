import { Container, FormControl, FormHelperText, Input, InputLabel } from '@material-ui/core'
import React from 'react'

export default function addDoctor() {
  return (
    <Container>
      <h3>Add Doctor Page</h3>

      <FormControl>
      <InputLabel htmlFor="my-input">Email address</InputLabel>
      <Input id="my-input" aria-describedby="my-helper-text" />
      <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
    </FormControl>
    </Container>
  )
}
