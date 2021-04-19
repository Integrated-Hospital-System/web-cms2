import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button, Container, TableHead, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import axios from '../axios/axios';
import Row from './Row';
import { useDispatch, useSelector } from 'react-redux';

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
  table: {
    minWidth: 650,
  },
  header: {
    fontWeight: "bold"
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#00F6B5',
    color: '#3075B5',
    float: 'right'
  }
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  header: {
    fontWeight: "bold"
  },
  addButton: {
    marginBottom: 20,
    backgroundColor: '#00F6B5',
    textAlign: 'right',
    color : 'black'
  }
});

export default function Doctors() {
  const classes = useStyles2();
  const accountStore = useSelector(state => state.accountStore);
  const dispatch = useDispatch();
  const history = useHistory();

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
        dispatch({ type : 'accounts/getAccount', payload: accounts.data });
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return (
    <Container>
    <h3> Welcome </h3>

    <TableContainer component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="custom pagination table">
        <TableHead >
          <TableRow>
            <TableCell />
            <TableCell align="left" className= { classes.header }>Email</TableCell>
            <TableCell align="left" className= { classes.header }>Name</TableCell>
            {
              accountStore.role === 'Doctor' && <TableCell align="left" className= { classes.header }>Specialty</TableCell>
            }
            <TableCell align="left" className= { classes.header }>Options </TableCell>
        </TableRow>
        </TableHead>
        <TableBody>
          <Row row = { accountStore } asal = { 'home' }></Row>
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
  );
}
