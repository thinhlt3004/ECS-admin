import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import * as serviceCateActions from "./../../redux/actions/serviceCateActions";
import { useDispatch, useSelector } from "react-redux";
import { serviceCateState$ } from "./../../redux/selectors/index";
import { Button } from "@mui/material";
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
import { ServiceCateRow, CreateServiceCate } from "../../Components";
const ServiceCategory = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isCreate, setIsCreate] = useState(false);
  const { data: serviceCate } = useSelector(serviceCateState$);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  useEffect(() => {
    dispatch(serviceCateActions.getserviceCateAll.getserviceCateAllRequest());
  }, [dispatch]);
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Employee Management</h2>
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
      {isCreate
      ? <CreateServiceCate setIsCreate={setIsCreate}/>
      :<div className={classes.tableContainer}>
        <TableContainer style={{ width: "50%" }} component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell align="center">ID</TableCell>
                <TableCell align="center">Category Name</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {serviceCate.length > 0 && serviceCate.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((i, index) => (
                    <TableRow key={index}>
                        <ServiceCateRow i={i}/>
                    </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[2]}
          component="span"
          count={serviceCate.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>}
      

    </div>
  );
};

export default ServiceCategory;
