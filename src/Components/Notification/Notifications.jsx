import { Alert, Slide, Snackbar } from "@mui/material";
import React from "react";
import { useStyles } from "./style";
import * as NotficationsActions from "./../../redux/actions/notificationActions";
import { useDispatch, useSelector } from "react-redux";
import { msgState$ } from "./../../redux/selectors/index";
function TransitionRight(props) {
  return <Slide {...props} direction="left" />;
}
const Notifications = () => {
  const classes = useStyles();
  const msg = useSelector(msgState$);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(NotficationsActions.closeNotifications());
  };
  return (
    <div>
      <Snackbar
        TransitionComponent={TransitionRight}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={msg !== ""}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="info"
          className={classes.Snackbar}
          sx={{ width: "100%" }}
        >
          {msg}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Notifications;
