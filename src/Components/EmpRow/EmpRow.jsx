import React, { useEffect, useState } from 'react'
import TableCell from "@mui/material/TableCell";
import { Button, MenuItem, Select } from '@mui/material';
import { useSelector } from 'react-redux';
import { authState$ } from '../../redux/selectors';
import * as API from './../../Api/index';
import {useStyles} from './style';
import FileBase from 'react-file-base64';
import {useDispatch} from 'react-redux';
import * as employeeActions from './../../redux/actions/employeeActions';
import * as notifcationActions from './../../redux/actions/notificationActions';
const EmpRow = ({emp}) => {
    const classes = useStyles();
    const {data: user} = useSelector(authState$);
    const [update, setUpdate] = useState(false);
    const [deparments, setDeparments] = useState([]);
    const [roles, setRoles] = useState([]);
    const [data, setData] = useState(null);
    const [file, setFile] = useState("");
    const [role, setRole] = useState("");
    const [depart, setDepart] = useState("");
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchData = async  () => {
            if(emp !== null){
                const resRole = await API.getAllRole();
                const resDe = await API.getAllDepartment();
                const currentRole = resRole.data.find(r => r.id === emp.roleId);
                const currentDepartment = resDe.data.find(r => r.id === emp.department);
                setRole(currentRole.role1);
                setDepart(currentDepartment.departmentName);
                setData({
                    employeeId : emp.employeeId,
                    userName: emp.userName,
                    fullName : emp.fullName,
                    email : emp.email,
                    phoneNumber : emp.phoneNumber,
                    roleId : emp.roleId,
                    department : emp.department,
                    image : emp.image
                });
            }
        }
        fetchData();
    },[emp, update])
    const handleOpenUpdate = async () => {
        const resRole = await API.getAllRole();
        if(resRole.status === 200){
            console.log(resRole.data);
            setRoles(resRole.data);
        }
        const resDe = await API.getAllDepartment();
        if(resDe.status === 200){
            console.log(resDe.data);
            setDeparments(resDe.data);
        } 
        setUpdate(true);
    }

    const handleUpdate = async () => {
        if(data.userName === ""){
            dispatch(notifcationActions.openNotifications('Username is required'));
            return;
        }
        if(data.fullName === ""){
            dispatch(notifcationActions.openNotifications('Fullname is required'));
            return;
        }
        if(data.email === ""){
            dispatch(notifcationActions.openNotifications('Email is required'));
            return;
        }
        if(data.phoneNumber === ""){
            dispatch(notifcationActions.openNotifications('Phone Number is required'));
            return;
        }
        const validPhone = new RegExp("^[0-9]{10,}");
        if(!validPhone.test(data.phoneNumber)){
            dispatch(notifcationActions.openNotifications('Phone Number must have 10 numbers'));
            return;
        }
        const payload =  {
            employeeId: data.employeeId,
            userName: data.userName,
            fullName: data.fullName,
            email: data.email,
            emailConfirm: emp.emailConfirm,
            roleId : data.roleId,
            passwordHash: emp.passwordHash,
            phoneNumber: data.phoneNumber,
            confirmToken: emp.confirmToken,
            department: data.department,
            image : file,
        }
        dispatch(employeeActions.updateEmployee.updateEmployeeRequest(payload));
        setUpdate(false);
    }
    const handleDelete = () => {
        dispatch(employeeActions.deleteEmployee.deleteEmployeeRequest(emp.employeeId));
    }
    return (
        <>
            <TableCell className={classes.cellSm} align="center">{emp.employeeId}</TableCell>
            <TableCell className={classes.cellSm} align="center">{update
               ? <input className={classes.inputSm} type="text" value={data.userName} onChange={(e) => setData({...data, userName: e.target.value})}/>
               : emp.userName
            }</TableCell>
            <TableCell className={classes.cellSm} align="center">{update
               ? <input className={classes.inputSm} type="text" value={data.fullName} onChange={(e) => setData({...data, fullName: e.target.value})} />
               : emp.fullName
            }</TableCell>
            <TableCell className={classes.cellLg} align="center">{update
               ? <input className={classes.inputLg} type="text" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} />
               : emp.email
            }</TableCell>
            <TableCell className={classes.cellSm} align="center">{update
               ? <input className={classes.inputSm} type="text" value={data.phoneNumber} onChange={(e) => setData({...data, phoneNumber: e.target.value})} />
               : emp.phoneNumber
            }</TableCell>
            <TableCell className={classes.cellSm} align="center">{update && user.roleId === 1 
            ? <Select className={classes.select} value={data.roleId} onChange={(e) => setData({...data, roleId: e.target.value})}>
                 {roles.length > 0 && roles.map((i, index) => (
                    <MenuItem key={index} value={i.id}>{i.role1}</MenuItem>
                 ))}
            </Select>
            : role}
            </TableCell>
            <TableCell className={classes.cellSm} align="center">{update
            ? <Select className={classes.select} value={data.department} onChange={(e) => setData({...data, department: e.target.value})}>
                 {deparments.length > 0 && deparments.map((i, index) => (
                    <MenuItem key={index} value={i.id}>{i.departmentName}</MenuItem>
                 ))}
            </Select>
            : depart}</TableCell>
            <TableCell className={classes.cellLg} align="center">
                {update 
                ? <>
                    <FileBase
                    type='file'
                    multiple={false}
                    onDone={({base64}) => setFile(base64)}
                    />
                </>
                :emp.image ? <img src={emp.image} alt={emp.image} style={{width: '40px', height: '40px'}} /> : 'No Image'
            }</TableCell>
            <TableCell align="center">
               {update === true 
               ?  <span className={classes.btnGroup} style={{display:'flex'}}> 
                    <Button variant="contained" style={{marginRight: '10px', width: '86px'}} color='success' onClick={handleUpdate}>OK</Button>
                    <Button variant="contained" style={{marginRight: '10px'}} onClick={() => setUpdate(false)} color="warning">Cancel</Button>
               </span>
               : <span className={classes.btnGroup} style={{display:'flex'}}> 
                <Button variant="contained" style={{marginRight: '10px'}} onClick={handleOpenUpdate}>Update</Button>
                {user.roleId === 1 && <Button variant="contained" color="error" onClick={handleDelete}>Delete</Button>
                }
                </span>
                }
            </TableCell>
        </>
    )
}

export default EmpRow
