import React, {useState} from 'react'
import {useStyles} from './style';
import {Button, Grid, TextField, Typography} from '@mui/material';
import { useSelector } from 'react-redux';
import { authState$ } from '../../redux/selectors';
import bcrypt from "bcryptjs";
import * as notificationActions from './../../redux/actions/notificationActions';
import * as authActions from './../../redux/actions/authActions';
import {useDispatch} from 'react-redux';
const UpdatePassword = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {data: user} = useSelector(authState$);
    const [formData, setFormData] = useState({
        currentPassword : '',
        newPassword : '',
        confirmPassword : '',
    })
    const handleSubmit = (e) => {
        e.preventDefault();
        if(bcrypt.compareSync(formData.currentPassword, user.passwordHash) === false){
            dispatch(notificationActions.openNotifications('Current Password is not correct'));
            return;
        }
        const validPassword = new RegExp("^[a-zA-Z0-9._:$!%-]{6,}");
        if(!validPassword.test(formData.newPassword)){
            dispatch(notificationActions.openNotifications('New Password must have more 6 characters'));
            return;
        }
        if(formData.newPassword !== formData.confirmPassword){
            dispatch(notificationActions.openNotifications('Confirm Password is not matched'));
            return;
        }
        const payload = {
            id: user.employeeId,
            password: formData.newPassword,
        }
        dispatch(authActions.updatePassword.updatePasswordRequest(payload));
    }
    return (
        <form className={classes.container} onSubmit={handleSubmit}>
            <h2 className={classes.header}>Update Password</h2>
            <Grid container spacing={3} align="center">
                <Grid item xs={12}>
                    <Typography gutterBottom>Current Password:</Typography>
                    <TextField type="password" value={formData.currentPassword} onChange={(e) => setFormData({...formData, currentPassword : e.target.value})}  />
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom>New Password:</Typography>
                    <TextField type="password" value={formData.newPassword} onChange={(e) => setFormData({...formData, newPassword : e.target.value})} />
                </Grid>
                <Grid item xs={12}>
                    <Typography gutterBottom>Confirm Password:</Typography>
                    <TextField type="password" value={formData.confirmPassword} onChange={(e) => setFormData({...formData, confirmPassword : e.target.value})}  />
                </Grid>
                <Grid item xs={12}>
                    <Button type="submit" variant="contained" size="large">Update</Button>
                </Grid>
            </Grid>
        </form>
    )
}

export default UpdatePassword
