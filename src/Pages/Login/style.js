import {makeStyles} from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
    container:{        
        width: '100vw',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundImage: 'url(https://t3.ftcdn.net/jpg/02/92/90/56/360_F_292905667_yFUJNJPngYeRNlrRL4hApHWxuYyRY4kN.jpg)',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
    },
    login:{
        marginRight: '150px',
        width: '20%',
        minHeight: '30%',
        border: '1px solid black',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        '& > h3':{
            margin: '20px 0px 15px',
            textTransform: 'uppercase',
        },
        '& > Button':{
            backgroundColor: 'black !important',
            padding: '5px 25px !important',
            fontSize: '15px',
        }
    }
}));