import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStyles } from "./style";
import * as serviceCateActions from './../../redux/actions/serviceCateActions';
import * as notificationActions from './../../redux/actions/notificationActions';
import { serviceCateState$ } from "../../redux/selectors";
const CreateServiceCate = ({setIsCreate}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [cateName, setCateName] = useState();
  const {data : serCate} = useSelector(serviceCateState$);
  const handleSumit = (e) => {
    e.preventDefault();
    var checkName = serCate.find(i => i.caterogoryName === cateName);
    if(checkName) {
        dispatch(notificationActions.openNotifications('Name is existed !'));
        return;
    }
    const payload = {
        caterogoryName: cateName,
    }
    dispatch(serviceCateActions.createserviceCateAll.createserviceCateAllRequest(payload));
    setIsCreate(false);
  };
  return (
    <form onSubmit={handleSumit}>
      <Typography
        style={{
          textAlign: "center",
          fontSize: "17px",
          fontWeight: 700,
          marginTop: "50px",
          textTransform: "uppercase",
        }}
      >
        Create new Service Category
      </Typography>
      <Box className={classes.containerForm}>
        <Box>
          <Typography>Category Name: </Typography>
          <TextField
            className={classes.textField}
            type="text"
            placeholder="Category Name"
            onChange={(e) => setCateName(e.target.value)}
          />
        </Box>
        <Box>
          <Button type="submit" variant="contained">
            Create
          </Button>
        </Box>
      </Box>
    </form>
  );
};

export default CreateServiceCate;
