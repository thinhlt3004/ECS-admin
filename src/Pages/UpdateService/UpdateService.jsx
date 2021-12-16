import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { serviceCateState$, serviceState$ } from "../../redux/selectors";
import { useStyles } from "./style";
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useHistory, useParams } from "react-router-dom";
import FileBase from "react-file-base64";
import * as serviceActions from "./../../redux/actions/serviceActions";
import * as notificationActions from "./../../redux/actions/notificationActions";
import { useDispatch } from "react-redux";
const UpdateService = () => {
  const { data: services } = useSelector(serviceState$);
  const { data: serCates } = useSelector(serviceCateState$);
  const classes = useStyles();
  const history = useHistory();
  const [data, setData] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const hanldeBack = () => {
    history.push("/service");
  };
  useEffect(() => {
    if (id !== null) {
      const ser = services.find((i) => i.id === id);
      if (ser !== null) {
        setData(ser);
      }
    }
  }, [id, history, services]);
  console.log(data);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.name === "") {
      dispatch(notificationActions.openNotifications("Name is empty!"));
      return;
    }
    if (data.description === "") {
      dispatch(notificationActions.openNotifications("Description is empty!"));
      return;
    }
    if (data.price === "") {
      dispatch(notificationActions.openNotifications("Price is empty!"));
      return;
    }
    if (parseInt(data.price) <= 0) {
      dispatch(notificationActions.openNotifications("Price is not valid!"));
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
    dispatch(serviceActions.updateService.updateserviceAllRequest(payload));
    history.push('/service');
  };
  if (data === null) return null;
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h2>Service Management</h2>
        <Button variant="outlined" onClick={hanldeBack}>
          Back to List
        </Button>
      </div>
      <form className={classes.formContainer} onSubmit={handleSubmit}>
        <Grid container spacing={5}>
          <Grid item xs={6}>
            <Typography gutterBottom>Id: </Typography>
            <TextField
              style={{ width: "100%" }}
              value={data.id}
              readOnly={true}
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
              onChange={(e) =>
                setData({ ...data, description: e.target.value })
              }
              multiline
              rows={4}
              maxRows={6}
              value={data.description}
            />
          </Grid>
          <Grid item xs={12} className={classes.btnBlock}>
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              style={{marginRight: '20px'}}
            >
              Submit
            </Button>
            <Button
              type="reset"
              color="warning"
              variant="contained"
              size="large"
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default UpdateService;
