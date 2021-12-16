import { Button, TableCell, TextField } from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { authState$ } from "../../redux/selectors";
import { useStyles } from "./style";
import * as notificationActions from './../../redux/actions/notificationActions';
import * as serviceCateActions from './../../redux/actions/serviceCateActions';
const ServiceCateRow = ({ i }) => {
  const classes = useStyles();
  const { data: user } = useSelector(authState$);
  const [isUpdate, setIsUpdate] = useState(false);
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const handleOpenUpdate = (e) => {
    setName(i.caterogoryName);
    setIsUpdate(true);
  };
  const handleUpdate = () => {
      if(name === "") {
        dispatch(notificationActions.openNotifications('Category Name is empty !'));
        return;
      }
      const payload = {
          id: i.id,
          caterogoryName: name
      }
      dispatch(serviceCateActions.updateserviceCateAll.updateserviceCateAllRequest(payload));
      setIsUpdate(false);
  }

  const handleDelete = () => {
    dispatch(serviceCateActions.deleteserviceCateAll.deleteserviceCateAllRequest(i.id));
  };
  return (
    <>
      <TableCell align="center">{i.id}</TableCell>
      <TableCell align="center" className={classes.cellLg}>
            {isUpdate 
                ? <TextField value={name} onChange={(e) => setName(e.target.value)} type="text" size="small"/>
                :i.caterogoryName
            }
      </TableCell>
      <TableCell align="center">
        {isUpdate ? (
          <>
            <Button
              variant="contained"
              style={{ marginRight: "10px", padding: '6px 16px', }}
              color="success"
              onClick={handleUpdate}
            >
              OK
            </Button>
            <Button
              variant="contained"
              style={{ marginRight: "10px" }}
              onClick={() => setIsUpdate(false)}
              color="warning"
            >
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button
              variant="contained"
              style={{ marginRight: "10px" }}
              onClick={handleOpenUpdate}
            >
              Update
            </Button>
            {user.roleId === 1 && (
              <Button variant="contained" color="error" onClick={handleDelete}>
                Delete
              </Button>
            )}
          </>
        )}
      </TableCell>
    </>
  );
};

export default ServiceCateRow;
