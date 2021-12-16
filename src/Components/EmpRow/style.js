import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    inputSm:{
        width: '100px',
        padding: '10px',
        border: '1px solid lightgray',
        borderRadius: '5px',
    },
    inputLg:{
        width: '150px',
        padding: '10px',
        border: '1px solid lightgray',
        borderRadius: '5px',
    },
    select:{
        height: '40px',
        border: 'none',
        fontSize: '12px !important',
        width: '100px'
        
    },
    cellSm: {
        width: '150px',
    },
    cellLg: {
        width: '200px',
    }
}));