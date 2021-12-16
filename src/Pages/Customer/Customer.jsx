import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";
import * as customerActions from "./../../redux/actions/customerActions";
import { customerState$ } from "../../redux/selectors";
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
import { CustomerRow } from "../../Components";
const Customer = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: customers } = useSelector(customerState$);
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
    dispatch(customerActions.getCustomersAll.getCustomersAllRequest());
  }, [dispatch]);


  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Customer Management</h2>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Id</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">FullName</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Gender</TableCell>
              <TableCell align="center">Birthday</TableCell>
              <TableCell align="center">Confirmed</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.length > 0 && customers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                <TableRow key={index}>
                    <CustomerRow i={i}/>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2]}
        component="span"
        count={customers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Customer;
