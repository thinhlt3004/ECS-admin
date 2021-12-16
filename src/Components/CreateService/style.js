import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container: {
        padding: '50px 150px',        
    },
    btnBlock:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& > Button':{
            marginRight:'30px'
        }
    }
}))