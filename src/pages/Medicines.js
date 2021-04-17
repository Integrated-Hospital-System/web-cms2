import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Button, Container, TableHead, TextField } from '@material-ui/core';
import { useHistory } from 'react-router';
import swal from 'sweetalert';
import axios from '../axios/axios';

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
    color: 'black',
    textAlign: 'right'
  }
});

export default function Doctors() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filter, setFilter] = useState('');
  const [rows, setRows] = useState([]);

  useEffect(() => {
    axios({
      method : 'GET',
      url : '/medicines'
    })
      .then(medicinesRes => {
        let medicines = medicinesRes.data;
        setRows(medicines);
      })
      .catch(err => {
        console.log(err);
      })     
  }, [])

  const rowsToShow = filter === "" ? rows : rows.filter(row => row.name.toLowerCase().includes(filter.toLowerCase()));

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rowsToShow.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const history = useHistory();

  function addMedicine () {
    history.push('/addMedicine');
  }

  function searchMedicines (event) {
    setFilter(event.target.value);
  }

  function deleteMedicine (id) {
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover this medicines!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          axios({
            method : 'DELETE',
            url: '/medicines/' + id
          })
            .then(({ data }) => {
              swal("Poof! Your medicines has been deleted!", {
                icon: "success",
              });
              let newRows = rows.filter(row => row.id !== id);
              setRows(newRows);
            })
            .catch(err => {
              console.log(err);
            })
        } else {
          swal("Your medicines is safe!");
        }
      });
  }

  function editMedicine (id) {
    history.push('/editMedicine/' + id);
  }

  return (
    <Container>
    <h3> List of all Medicines </h3>

    <div style={{float: "right", marginBottom: "10px"}}>
      <Button variant="contained" style={{backgroundColor: "#1de9b6"}} className = { classes.addButton } onClick = {() => addMedicine() }>Add New Medicines</Button>  
    </div>

    <div>
      <TextField id="standard-basic" label="Search Medicines" onChange = { event => searchMedicines(event) }/>
    </div>

    <TableContainer component={Paper}>
      <Table className={classes.table} stickyHeader aria-label="custom pagination table">
        <TableHead >
          <TableRow>
            <TableCell align="left" className= { classes.header }>Name</TableCell>
            <TableCell align="left" className= { classes.header }>Description</TableCell>
            <TableCell align="left" className= { classes.header }>Stock</TableCell>
            <TableCell align="left" className= { classes.header }>Options</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? rowsToShow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rowsToShow
          ).map((row, index) => (
            <TableRow key={ index }>
              <TableCell component="th" scope="row"> { row.name } </TableCell>
              <TableCell align="left">{ row.description }</TableCell>
              <TableCell align="left">{ row.stock }</TableCell>
              <TableCell align="left">
                <Button variant="contained" color="primary" style={{ marginRight: 30 }} onClick = { () => editMedicine(row.id) }>Edit</Button>
                <Button variant="contained" color="secondary" onClick = { () => deleteMedicine(row.id) } >Delete</Button>
              </TableCell>

            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
    </Container>
    
  );
}
