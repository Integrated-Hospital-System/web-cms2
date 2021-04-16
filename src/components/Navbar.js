import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";



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

  return (
    <AppBar position="static" color="default" elevation={0} className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
          <Link to="/" variant="button" color="textPrimary" className={classes.link}>
            <img src="https://i.imgur.com/RUjVrWs.png" style={{width: "60px"}} alt="logo Mamed"/>
          </Link>
        </Typography>
          <div>
            <Link to="/doctors" className={classes.link}>
              List Doctors
            </Link>
            <Link to="/medicines" className={classes.link}>
              List Medicines
            </Link>
            <Link to="/appointments" className={classes.link}>
              Appointment
            </Link>
            <Link to="/login">
              <Button href="#" color="primary" variant="outlined" className={classes.link}>
                Login
              </Button>
            </Link>
          </div>
      </Toolbar>
    </AppBar>
  )
}
