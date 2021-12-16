import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container:{
        flex: 6,
        border: '1px solid #e0e0e0',
        minHeight: '100vh'
    },
    header:{
        padding: '30px',
        textAlign: 'center',
        textTransform:'uppercase',
    }
}));