import { Box, Button } from '@mui/material';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { authState$ } from '../../redux/selectors';
import {useStyles} from './style';
import * as authActions from './../../redux/actions/authActions';
const Header = () => {
    const classes = useStyles();
    const {data:user} = useSelector(authState$);
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(authActions.logOut.logOutRequest());
    }
    return (
        <Box className={classes.container}>
            <Box className={classes.logo}>ECS.</Box>
            <Box className={classes.adminHeader}>
                <Box>{user.userName}</Box>   
                <Button variant='outlined' onClick={handleLogOut}>Log Out</Button> 
            </Box>
        </Box>
    )
}

export default Header
