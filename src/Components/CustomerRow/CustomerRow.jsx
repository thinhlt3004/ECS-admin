import { Button, MenuItem, Select, TableCell, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as notificationActions from './../../redux/actions/notificationActions';
import * as customerActions from './../../redux/actions/customerActions';
import {customerState$} from  './../../redux/selectors/index';
const CustomerRow = ({i}) => {
    const [isUpdate, setIsUpdate] = useState(false);
    const [data, setData] = useState(null);
    const dispatch = useDispatch();
    const {data : customers} = useSelector(customerState$)
    const handleUpdate = (e) => {
        setData({
            email : i.email,
            fullName: i.fullName,
            phoneNumber: i.phoneNumber,
            gender: i.gender,
            birthday: i.birthday.slice(0, 10),        
        })
        setIsUpdate(true);
    }

    const handleSubmit = () => {
        const currentCheck = customers.find(c => c.email === data.email);
        if (currentCheck.id !== i.id) {
            dispatch(notificationActions.openNotifications('Email is existed'));
            return;
        }
        const validEmail = new RegExp(
            "^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$"
          );
        const validPhone = new RegExp("^[0-9]{9,}");
        if(!validEmail.test(data.email)){
            dispatch(notificationActions.openNotifications('Email is not valid'));
            return;
        }
        if(data.fullName === ''){
            dispatch(notificationActions.openNotifications('Fullname is empty'));
            return;
        }
        if(!validPhone.test(data.phoneNumber)){
            dispatch(notificationActions.openNotifications('Phone Number is not valid'));
            return;
        }
        const payload = {
            id: i.id,
            fullName: data.fullName,
            email: data.email,
            phoneNumber: data.phoneNumber,
            birthday: data.birthday,
            gender: data.gender,
            passwordHash : i.passwordHash,
            emailConfirm : i.emailConfirm,
            confirmToken: i.confirmToken
        }
        dispatch(customerActions.updateCustomer.updateCustomerRequest(payload));
        setIsUpdate(false);
    }
    return (
        <>
            <TableCell align="center">{i.id}</TableCell>
            <TableCell align="center">{isUpdate 
                ? <TextField type="text" value={data.email} onChange={(e) => setData({...data, email: e.target.value})} size="small" />
                :i.email}
            </TableCell>
            <TableCell align="center" style={{width: '200px'}}>
            {isUpdate 
                ? <TextField type="text" value={data.fullName} onChange={(e) => setData({...data, fullName: e.target.value})} size="small" />
                :i.fullName}
            </TableCell>
            <TableCell align="center" style={{width: '200px'}} >
            {isUpdate 
                ? <TextField type="text" value={data.phoneNumber} onChange={(e) => setData({...data, phoneNumber: e.target.value})} size="small" />
                :i.phoneNumber}
            </TableCell>
            <TableCell align="center">
                {isUpdate
                    ? <Select size='small' value={data.gender} onChange={(e) => setData({...data, gender:e.target.value})}>
                        <MenuItem value={true}>Male</MenuItem>
                        <MenuItem value={false}>Female</MenuItem>
                    </Select>
                    : i.gender === true ? 'Male' : 'Female'
                }
            </TableCell>
            <TableCell align="center">
                {isUpdate 
                ? <TextField type="date" value={data.birthday} onChange={(e) => setData({...data, birthday: e.target.value})} size="small" />
                :i.birthday.slice(0, 10)}
            </TableCell>
            <TableCell align="center">{i.emailConfirm.toString()}</TableCell>
            <TableCell align="center" style={{ width: '250px'}}>
                {isUpdate 
                ?<>
                    <Button variant="contained" color="primary" onClick={handleSubmit}>Ok</Button>
                    <Button variant="contained" color='warning' onClick={(e) => setIsUpdate(false)}>Cancel</Button>
                </>
                :<Button variant="contained" onClick={handleUpdate}>Update</Button>}
            </TableCell>

        </>
    )
}

export default CustomerRow
