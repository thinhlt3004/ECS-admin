import { Button } from "@mui/material";
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
import {useDispatch, useSelector} from 'react-redux';
import * as serviceActions from './../../redux/actions/serviceActions';
import * as serviceCateActions from './../../redux/actions/serviceCateActions';
import {serviceState$} from './../../redux/selectors/index';
import { CreateService, ServiceRow } from "../../Components";
const Service = () => {
  const classes = useStyles();
  const [isCreate, setIsCreate] = useState(false);



  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const dispatch = useDispatch();
  const {data: services} = useSelector(serviceState$);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  useEffect(() => {
    dispatch(serviceActions.getserviceAll.getserviceAllRequest());
    dispatch(serviceCateActions.getserviceCateAll.getserviceCateAllRequest());
  },[dispatch])

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Service Management</h2>
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
            Create New
          </Button>
        )}
      </div>
        {isCreate ? (
          <CreateService setIsCreate={setIsCreate}/>
        ) : (
          <div className={classes.tableContainer}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 300 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">ID</TableCell>
                    <TableCell align="center">Name</TableCell>
                    {/* <TableCell align="center">Descriptions</TableCell> */}
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="center">Service Category</TableCell>
                    <TableCell align="center">Image</TableCell>
                    <TableCell align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {services.length > 0 && services.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                    <TableRow key={index}>
                      <ServiceRow i={i}/>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[2]}
              component="span"
              count={services.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        )}
    </div>
  );
};

export default Service;
