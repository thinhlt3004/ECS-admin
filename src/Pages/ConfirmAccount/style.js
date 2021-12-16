import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container:{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        '& > h2':{
            fontSize: '50px'
        },
        '& > a':{
            fontSize: '25px',
            marginTop: '25px'
        }
    }
}));