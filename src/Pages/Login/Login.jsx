import React, { useState } from "react";
import { useStyles } from "./style";
import { Box, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import * as authActions from './../../redux/actions/authActions';
const Login = () => {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
      e.preventDefault();
      dispatch(authActions.login.loginRequest({email, password}))
  }
  return (
    <Box className={classes.container}>
      <form className={classes.login} onSubmit={handleSubmit}>
        <h3>Admin Login</h3>

        <input
          style={{ padding: "10px", marginBottom: "20px" }}
          type="text"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ padding: "10px", marginBottom: "20px" }}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">Login</Button>
      </form>
    </Box>
  );
};

export default Login;
