import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container:{
        padding: '100px 150px',
    },
    btn:{
        height: '50px',
        width: '150px',
        marginRight: '20px !important',
    },
    btnBlock:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '30px !important',
    }
}));