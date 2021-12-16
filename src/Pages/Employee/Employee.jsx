import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";
import * as employeeActions from "./../../redux/actions/employeeActions";
import { empState$ } from "../../redux/selectors";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { EmpRow, CreateEmp } from "../../Components";
import { Button, TablePagination } from "@mui/material";

const Employee = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { data: emps } = useSelector(empState$);
  const [isCreate, setIsCreate] = useState(false);
  useEffect(() => {
    dispatch(employeeActions.getAll.getAllRequest());
  }, [dispatch]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Employee Management</h2>
        {isCreate 
        ?<Button variant="outlined" color='warning' onClick={(e) => setIsCreate(false)}>Cancel</Button>
        :<Button variant="outlined" onClick={(e) => setIsCreate(true)}>Create New</Button>}
      </div>
      {isCreate 
      ?<CreateEmp setIsCreate={setIsCreate} isCreate={isCreate}/>
      :<>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Employee ID</TableCell>
              <TableCell align="center">Username</TableCell>
              <TableCell align="center">FullName</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Phone Number</TableCell>
              <TableCell align="center">Role ID</TableCell>
              <TableCell align="center">Department ID</TableCell>
              <TableCell align="center">Image</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {emps.length > 0 &&
              emps
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((i, index) => (
                  <TableRow key={index}>
                    <EmpRow emp={i}/>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[2]}
        component="span"
        count={emps.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      </>}
    </div>
  );
};

export default Employee;
