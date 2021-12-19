import { Button, MenuItem, Select, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { reportState$ } from "../../redux/selectors";
import * as reportActions from "./../../redux/actions/reportActions";
import * as serviceCustomerActions from './../../redux/actions/serviceCustomerActions';
import { ReportRow, CreateReport } from "../../Components";
const Report = () => {
  const classes = useStyles();
  const [isCreate, setIsCreate] = useState(false);
  const [chooseMonth, setChooseMonth] = useState(12);
  const [id, setId] = useState(13);
  const dispatch = useDispatch();
  const { data: reports } = useSelector(reportState$);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  useEffect(() => {
    dispatch(
      serviceCustomerActions.getAllServiceCustomer.getAllServiceCustomerRequest()
    );
  },[dispatch])
  useEffect(() => {
    if (chooseMonth !== "" && id !== "") {
      const payload = {
        id: id,
        month: chooseMonth,
      };
      dispatch(reportActions.getAllReport.getAllReportRequest(payload));
    }
  }, [chooseMonth, id, dispatch]);
  
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Report Management</h2>
        <div>
          <TextField
            size="small"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Write the Service Of Customer"
            style={{ width: "300px", marginRight: "10px" }}
          />
          <Select
            size="small"
            value={chooseMonth}
            style={{width: '150px'}}
            onChange={(e) => setChooseMonth(e.target.value)}
          >
            {months.map((i, index) => (
              <MenuItem value={index + 1} key={index}>
                {i}
              </MenuItem>
            ))}
          </Select>
        </div>
        {isCreate ? (
          <Button
            variant="outlined"
            color="warning"
            onClick={(e) => setIsCreate(false)}
          >
            Cancel
          </Button>
        ) : (
          <Button variant="outlined" onClick={(e) => setIsCreate(true)}>
            Insert
          </Button>
        )}
      </div>
      {isCreate ? (
        <CreateReport/>
      ) : (
        <>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Id</TableCell>
                  <TableCell align="center">Service Of Customer</TableCell>
                  <TableCell align="center">Date</TableCell>
                  <TableCell align="center">Count</TableCell>
                  <TableCell align="center">Total Price</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reports.length > 0 && reports.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                            <TableRow key={index}>
                                <ReportRow i={i}/>
                            </TableRow>
                        ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[2]}
            component="span"
            count={reports.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </div>
  );
};

export default Report;
