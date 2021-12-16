import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        flex: 6,
        border: '1px solid #e0e0e0',
        minHeight: '100vh'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '15px 30px',
    },
    tableContainer:{
        marginTop: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }
}))