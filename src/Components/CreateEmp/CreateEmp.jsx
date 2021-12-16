import React, { useEffect, useState } from "react";
import { useStyles } from "./style";
import * as API from "./../../Api/index";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import * as employeeActions from './../../redux/actions/employeeActions';
import * as notificationActions from './../../redux/actions/notificationActions';
import { empState$ } from "../../redux/selectors";
const CreateEmp = ({isCreate, setIsCreate}) => {
  const classes = useStyles();
  const [deparments, setDeparments] = useState([]);
  const dispatch = useDispatch();
  const {data : emps} = useSelector(empState$);
  const [roles, setRoles] = useState([]);
  const [data, setData] = useState({
    employeeId: "",
    userName: "",
    fullname: "",
    email: "",
    phoneNumber: "",
    departments: "",
    role: "",
  });
  useEffect(() => {
    const fetchRoleNDepartment = async () => {
      const resRole = await API.getAllRole();
      if (resRole.status === 200) {
        // console.log(resRole.data);
        setRoles(resRole.data);
      }
      const resDe = await API.getAllDepartment();
      if (resDe.status === 200) {
        // console.log(resDe.data);
        setDeparments(resDe.data);
      }
    };
    fetchRoleNDepartment();
  }, []);

  const handleSubmit = (e) =>{
      e.preventDefault();

      const checkCurrent = emps.find(i => i.employeeId === data.employeeId);
      if(checkCurrent) {
        dispatch(notificationActions.openNotifications('EmployeeID is existed'));
        return;
      }

      if(data.employeeId === "" || data.userName === "" || data.fullname === "" || data.email === "" || data.role === "" || data.phoneNumber === "" || data.deparments === ""){
        dispatch(notificationActions.openNotifications('All Field is required'));
        return;
      }
      const validPhone = new RegExp("^[0-9]{10,}");
      if(!validPhone.test(data.phoneNumber)){
          dispatch(notificationActions.openNotifications('Phone Number must have 10 numbers'));
          return;
      }
      const payload = {
          employeeId : data.employeeId,
          userName : data.userName,
          fullName : data.fullname,
          email : data.email,
          roleId : data.role,
          phoneNumber:data.phoneNumber,
          department :data.departments,          
      };
      dispatch(employeeActions.createEmployee.createEmployeeRequest(payload));
      setIsCreate(false);
  }

  return (
    <form onSubmit={handleSubmit}> 
      <Grid container spacing={5} className={classes.container}>
        <Grid item xs={6}>
          <Typography gutterBottom>EmployeeID</Typography>
          <TextField
            style={{ width: "100%" }}
            type="text"
            placeholder="EmployeeID"
            onChange={(e) => setData({...data,employeeId : e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Username</Typography>
          <TextField
            style={{ width: "100%" }}
            type="text"
            placeholder="userName"
            onChange={(e) => setData({...data,userName : e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Fullname</Typography>
          <TextField
            style={{ width: "100%" }}
            type="text"
            placeholder="fullName"
            onChange={(e) => setData({...data,fullname : e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Email</Typography>
          <TextField
            style={{ width: "100%" }}
            type="text"
            placeholder="email"
            onChange={(e) => setData({...data,email : e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>PhoneNumber</Typography>
          <TextField
            style={{ width: "100%" }}
            type="text"
            placeholder="PhoneNumber"
            onChange={(e) => setData({...data,phoneNumber : e.target.value })}
          />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Department</Typography>
          <Select
            style={{ width: "100%" }}
            value={data.departments}
            onChange={(e) => setData({ ...data, departments: e.target.value })}
          >
            <MenuItem value="">---Department---</MenuItem>
            {deparments.length > 0 &&
              deparments.map((i, index) => (
                <MenuItem key={index} value={i.id}>
                  {i.departmentName}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>Role</Typography>
          <Select
            style={{ width: "100%" }}
            value={data.role}
            onChange={(e) => setData({ ...data, role: e.target.value })}
          >
            <MenuItem value="">---Role---</MenuItem>
            {roles.length > 0 &&
              roles.map((i, index) => (
                <MenuItem key={index} value={i.id}>
                  {i.role1}
                </MenuItem>
              ))}
          </Select>
        </Grid>
        <Grid item xs={6} className={classes.btnBlock}>
          <Button
            className={classes.btn}
            type="submit"
            color="primary"
            variant="contained"
          >
            Create
          </Button>
          <Button
            className={classes.btn}
            type="reset"
            color="warning"
            variant="contained"
          >
            Reset
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default CreateEmp;
