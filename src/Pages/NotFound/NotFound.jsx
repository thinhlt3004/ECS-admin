import React from 'react'
import {useStyles} from './style';
const NotFound = () => {
    const classes = useStyles();
    return (
        <div className={classes.container}>
            <h2>404</h2>
            <p>Page Not Found</p>
        </div>
    )
}

export default NotFound
