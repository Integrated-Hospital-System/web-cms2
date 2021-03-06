import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset"
    }
  },
  header: {
    fontWeight: "bold"
  },
});

export default function RowOrder (props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          { row.appointment.patient.name }
        </TableCell>
        <TableCell align="left">{ row.appointment.patient.email}</TableCell>  
        <TableCell align="left">{ row.diseases.join(', ') }</TableCell>
        <TableCell align="left">{ row.appointment.appointmentDate.substring(0, 10) }</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Medicines
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="left" className= { classes.header }>Name</TableCell>
                    <TableCell align="left" className= { classes.header }>Times Per Day</TableCell>
                    <TableCell align="left" className= { classes.header }>Doses</TableCell>
                    <TableCell align="left" className= { classes.header }>Total Medicine</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  { row.medicines.map((medicineRow) => (
                    <TableRow key={medicineRow._id}>
                      <TableCell component="th" scope="row">
                        {medicineRow.medicine.name}
                      </TableCell>
                      <TableCell>{medicineRow.timesPerDay}</TableCell>
                      <TableCell align="left">{medicineRow.doses}</TableCell>
                      <TableCell align="left">{medicineRow.totalMedicine}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  )

}