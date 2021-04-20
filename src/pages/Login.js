import React, { useState } from 'react';
import { Avatar, Button, CssBaseline, TextField, Link, Paper, Box, Grid, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom'
import axios from '../axios/axios';
import { useDispatch, useSelector } from 'react-redux';
import swal from 'sweetalert';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        MaMed.id
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));



export default function SignInSide() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useState({
    email : '',
    password : ''
  })
  const dispatch = useDispatch();
  const accountStorage = useSelector(state => state.accountStorage);

  const login = () => {
    history.push('/appointments');
  }

  const loginAdmin = () => {
    history.push('/doctors');
  }

  function handleChange (event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    let newUser = { ...user, [name] : value };
    setUser(newUser);
  }

  function handleSubmit (event) {
    event.preventDefault();

    axios({
      method: 'POST',
      url : '/login',
      data : user
    })
      .then(response => {
        swal("Success!", `Welcome to MaMed CMS ${response.data.account.name}!`, "success");
        localStorage.setItem('access_token', response.data.access_token);
        dispatch({ type : 'accounts/getAccount', payload: response.data.account });
        if (response.data.account.role === 'Doctor') {
          login();
        } else {
          loginAdmin();
        }
      })
      .catch(err => {
        console.log(err);
      })
    
  }

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit = { handleSubmit }>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              type="email"
              onChange = { handleChange }
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
              onChange = { handleChange }
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{backgroundColor: "#1de9b6"}}
              className={classes.submit}
            >
              Sign In
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}