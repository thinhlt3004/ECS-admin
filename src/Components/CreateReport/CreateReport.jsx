import { Grid, MenuItem, Select, Typography, TextField, Button } from '@mui/material';
import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { serviceCustomerState$ } from '../../redux/selectors';
import {useStyles} from './style';
import * as notificationActions from './../../redux/actions/notificationActions';
import * as reportActions from './../../redux/actions/reportActions';
import {useDispatch} from 'react-redux';
const CreateReport = () => {
    const classes = useStyles();
    const {data: serviceCus} = useSelector(serviceCustomerState$);
    const dispatch = useDispatch();
    const [data, setData] = useState({
        serviceCusId: '',
        amount: '',
        totalPrice: '',
        currentDate: ''

    });
    useEffect(() => {
        const date = new Date().toISOString().slice(0, 10);
        setData((prev) => ({...prev, currentDate: date}));
    },[])

    const handleAmount = (e) => {
        if(data.serviceCusId !== ""){
            const current = serviceCus.find(i => i.id === data.serviceCusId);
            
            if(current){
                setData({...data,amount: e.target.value, totalPrice :  e.target.value * current.productPrice });
            }
        }
    }

    const handleInsert = () => {
        if(data.serviceCusId === ""){
            dispatch(notificationActions.openNotifications('Please choose Service Customer ID'));
            return;
        }
        if(data.amount === ""){
            dispatch(notificationActions.openNotifications('Please insert amount of Today'));
            return;
        }
        const payload = {
            serviceOfCus : data.serviceCusId,
            date : data.currentDate,
            count : data.amount,
            totalPrice : data.totalPrice
        }
        dispatch(reportActions.insertReport.insertReportRequest(payload));
    }
    return (
        <div className={classes.container}>
            <Grid container spacing={4}>
                <Grid item xs={6}>
                    <Typography gutterBottom>Service Customer</Typography>
                    <Select style={{width: '100%'}} value={data.serviceCusId} onChange={(e) => setData({...data, serviceCusId: e.target.value})}>
                        <MenuItem value="">--Choose---</MenuItem>
                        {serviceCus.length > 0 && serviceCus.map((i, index) => (
                            <MenuItem key={index} value={i.id}>{i.id}</MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Current Date</Typography>
                    <TextField style={{width: '100%'}} value={data.currentDate} type="date" readOnly={true}/>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>Amount</Typography>
                    <TextField style={{width: '100%'}} value={data.amount} onChange={handleAmount} type="number" placeholder="Enter amount of Today"/>
                </Grid>
                <Grid item xs={6}>
                    <Typography gutterBottom>totalPrice</Typography>
                    <TextField style={{width: '100%'}} value={data.totalPrice} readOnly={true}/>
                </Grid>
                <Grid item xs={12} align="center">
                    <Button variant="contained" size="large" onClick={handleInsert}>Insert</Button>
                </Grid>
            </Grid>
        </div>
    )
}

export default CreateReport
