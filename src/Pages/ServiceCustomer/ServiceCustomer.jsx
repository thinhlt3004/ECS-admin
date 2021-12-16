import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useStyles } from "./style";
import * as serviceCustomerActions from "./../../redux/actions/serviceCustomerActions";
import { useSelector } from "react-redux";
import { serviceCustomerState$ } from "../../redux/selectors";
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
import {SerCusRow} from './../../Components';
import * as customerActions from './../../redux/actions/customerActions';
import * as serviceActions from './../../redux/actions/serviceActions';
import * as employeeActions from './../../redux/actions/employeeActions';
const ServiceCustomer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: serCus } = useSelector(serviceCustomerState$);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(
      serviceCustomerActions.getAllServiceCustomer.getAllServiceCustomerRequest()
    );
    dispatch(customerActions.getCustomersAll.getCustomersAllRequest());
    dispatch(serviceActions.getserviceAll.getserviceAllRequest());
    dispatch(employeeActions.getAll.getAllRequest());
  }, [dispatch]);

  console.log(serCus);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Service Customer Management</h2>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">ID</TableCell>
              <TableCell align="center">Customer</TableCell>
              <TableCell align="center">Service</TableCell>
              <TableCell align="center">Payment Price</TableCell>
              <TableCell align="center">Product</TableCell>
              <TableCell align="center">Product Price</TableCell>
              <TableCell align="center">Start Date</TableCell>
              <TableCell align="center">End Date</TableCell>
              <TableCell align="center">Days</TableCell>
              <TableCell align="center">EmployeeHandle</TableCell>
              <TableCell align="center">Employee Start Date</TableCell>
              <TableCell align="center">Employee End Date</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {serCus.length >  0 && serCus.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
              <TableRow key={index}>
                <SerCusRow i={i}/>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2]}
        component="span"
        count={serCus.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default ServiceCustomer;
