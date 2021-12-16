import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        flex: 6,
        border: '1px solid #e0e0e0',
        minHeight: '100vh',
        padding: '30px 50px',
        color: '#555555',
    },
    gridContainer:{
        padding: ' 10px 200px',
    },
    chartContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '40px',
    }
}))