import React, { useEffect, useState } from "react";
import { Button, TableCell } from "@mui/material";
import { useSelector } from "react-redux";
import { authState$, serviceCateState$ } from "./../../redux/selectors/index";
import * as serviceActions from "./../../redux/actions/serviceActions";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
const ServiceRow = ({ i }) => {
  const [cateName, setCateName] = useState("");
  const dispatch = useDispatch();
  const { data: serviceCates } = useSelector(serviceCateState$);
  const { data: user } = useSelector(authState$);
  const history = useHistory();
  useEffect(() => {
    if (serviceCates.length > 0) {
      let serviceCategory = serviceCates.find(
        (c) => c.id === i.serviceCategoryId
      );
      if (serviceCategory) {
        setCateName(serviceCategory.caterogoryName);
      }
    }
  }, [i, serviceCates]);

  const handleDelete = () => {
    dispatch(serviceActions.deleteService.deleteServiceAllRequest(i.id));
  };

  const handleUpdateClick = () => {
    history.push(`/update-service/${i.id}`);
  }
  return (
    <>
      <TableCell align="center">{i.id}</TableCell>
      <TableCell align="center">{i.name}</TableCell>
      {/* <TableCell align="center">{i.description}</TableCell> */}
      <TableCell align="center">{i.price}</TableCell>
      <TableCell align="center">{cateName}</TableCell>
      <TableCell align="center">
        {i.image ? (
          <img
            src={i.image}
            alt="img"
            style={{ width: "40px", height: "40px" }}
          />
        ) : (
          "No Image"
        )}
      </TableCell>
      <TableCell align="center">
        <Button
          variant="contained"
          style={{ marginRight: "10px" }}
          onClick={handleUpdateClick}
        >
          Update
        </Button>
        {user.roleId === 1 && (
          <Button variant="contained" color="error" onClick={handleDelete}>
            Delete
          </Button>
        )}
      </TableCell>
    </>
  );
};

export default ServiceRow;
