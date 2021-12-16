import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container:{
        flex: 6,
        border: '1px solid #e0e0e0',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& > h2':{
            fontSize: '100px'
        },
        '& > p':{
            fontSize: '30px'
        }
    }
}));