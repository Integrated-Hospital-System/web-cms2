import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import axios from '../axios/axios';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
    color: "black",
    textDecoration: "none",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function Navbar() {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const [role, setRole] = useState('');
  const accountStore = useSelector(state => state.accountStore);

  useEffect(() => {

      axios(
        {
          url : 'accounts/index',
          headers : {
            access_token : localStorage.getItem('access_token')
          }
        }
      )
        .then(accounts => {
          // dispatch({ type : 'accounts/getAccount', payload : accounts.data })
          setRole(accounts.data.role);
        })
        .catch(err => {
          console.log(err);
        })
    
  }, [])

  function showLogout () {
    if (localStorage.access_token) {
      return (
        <Link to="/login">
        <Button onClick = { logout } href="#" color="primary" variant="outlined" className={classes.link}>
          Logout
        </Button>
      </Link>
      )
    } else {
      return (
        <Link to="/login">
        <Button onClick = { logout } href="#" color="primary" variant="outlined" className={classes.link}>
          Login
        </Button>
      </Link>
      )
    }
  }

  function showListDoctor () {
    if (role === 'Doctor') {
      return (
        <>
        </>
      )
    } else {
      return  (
        <Link to="/doctors" className={classes.link}>
          List Doctors
        </Link>
      )
    }
  }

  function logout () {
    localStorage.removeItem('access_token');
  }

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link to="/" variant="button" color="textPrimary" className={classes.link}>
            <img src="https://i.imgur.com/RUjVrWs.png" style={{width: "60px"}} alt="logo Mamed"/>
          </Link>
        </Typography>
          <div>
            { showListDoctor() }         
            <Link to="/medicines" className={classes.link}>
              List Medicines
            </Link>
            <Link to="/appointments" className={classes.link}>
              Appointment
            </Link>
            { showLogout() }
          </div>
      </Toolbar>
    </AppBar>
  )
}
