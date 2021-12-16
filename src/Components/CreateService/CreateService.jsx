import {
  Grid,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { serviceCateState$, serviceState$ } from "../../redux/selectors";
import { useStyles } from "./style";
import FileBase from "react-file-base64";
import { useDispatch } from "react-redux";
import * as notificationActions from "./../../redux/actions/notificationActions";
import * as serviceActions from "./../../redux/actions/serviceActions";
const CreateService = ({ setIsCreate }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { data: serCates } = useSelector(serviceCateState$);
  const { data: services } = useSelector(serviceState$);
  const [data, setData] = useState({
    id: "",
    name: "",
    description: "",
    price: "",
    serviceCategoryId: "",
    image: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.id === "") {
      dispatch(notificationActions.openNotifications("ID is empty"));
      return;
    }
    var currentID = services.find((i) => i.id === data.id);
    if (currentID) {
      dispatch(notificationActions.openNotifications("ID is existed"));
      return;
    }
    if (data.name === "") {
      dispatch(notificationActions.openNotifications("Name is empty"));
      return;
    }
    if (data.price === "") {
      dispatch(notificationActions.openNotifications("Price is empty"));
      return;
    }
    if (data.price <= 0) {
      dispatch(
        notificationActions.openNotifications("Price must be higher than zero")
      );
      return;
    }
    if (data.serviceCategoryId === "") {
      dispatch(
        notificationActions.openNotifications("Please choose category service")
      );
      return;
    }
    if (data.description <= 0) {
      dispatch(notificationActions.openNotifications("Description is empty"));
      return;
    }
    if (data.image === "") {
      dispatch(notificationActions.openNotifications("Image is empty"));
      return;
    }
    const payload = {
      id: data.id,
      name: data.name,
      description: data.description,
      price: data.price,
      serviceCategoryId: data.serviceCategoryId,
      image: data.image,
    };
    dispatch(serviceActions.createService.createserviceAllRequest(payload));
    setIsCreate(false);
  };
  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <Grid container spacing={5}>
        <Grid item xs={6}>
          <Typography gutterBottom>Id: </Typography>
          <TextField
            style={{ width: "100%" }}
            onChange={(e) => setData({ ...data, id: e.target.value })}
            value={data.id}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Name: </Typography>
          <TextField
            style={{ width: "100%" }}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            value={data.name}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Category Service: </Typography>
          <Select
            style={{ width: "100%" }}
            onChange={(e) =>
              setData({ ...data, serviceCategoryId: e.target.value })
            }
            value={data.serviceCategoryId}
          >
            <MenuItem value="">--Category Service--</MenuItem>
            {serCates.length > 0 &&
              serCates.map((i, index) => (
                <MenuItem value={i.id} key={index}>
                  {i.caterogoryName}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Price: </Typography>
          <TextField
            type="number"
            style={{ width: "100%" }}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            value={data.price}
          />
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Image: </Typography>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "25px",
            }}
          >
            <FileBase
              type="file"
              multiple={false}
              style={{ width: "100% !important", height: "100%" }}
              onDone={({ base64 }) => setData({ ...data, image: base64 })}
            />
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>Description: </Typography>
          <TextField
            style={{ width: "100%" }}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            value={data.description}
            multiline
            rows={4}
            maxRows={6}
          />
        </Grid>
        <Grid item xs={12} className={classes.btnBlock}>
          <Button
            type="submit"
            color="primary"
            variant="contained"
            size="large"
          >
            Submit
          </Button>
          <Button type="reset" color="warning" variant="contained" size="large">
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateService;
