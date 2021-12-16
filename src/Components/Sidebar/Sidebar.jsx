import React from 'react'
import { useStyles } from './style'
import {Box} from '@mui/material';
import { NavLink } from 'react-router-dom';
const Sidebar = () => {
    const classes = useStyles();
    return (
        <Box className={classes.container}>
            <h4>
                Dashboard
            </h4>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} exact to='/'>Home</NavLink>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} to='/update-password'>Update Password</NavLink>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} to='/employee'>Employee</NavLink>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} to='/service'>Service</NavLink>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} to='/service-category'>Service Category</NavLink>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} to='/report'>Report</NavLink>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} to='/customer'>Customer</NavLink>
            <NavLink className={classes.navLink} activeClassName={classes.menuActive} to='/service-customer'>Service Of Customer</NavLink>
        </Box>
    )
}

export default Sidebar
