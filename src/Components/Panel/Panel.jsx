import React from 'react'
import {useStyles} from './style';

const Panel = ({title, color, icon, value}) => {
    const classes = useStyles();
    return (
        <div style={{backgroundColor: color}} className={classes.container}>
            <div className={classes.title}>{title}</div>
            <div className={classes.valueContainer}>
                {icon}
                <p>{value}</p>
            </div>
        </div>
    )
}

export default Panel
