import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container:{
        height: '140px',
        borderRadius: '20px',
        color: 'white',
        fontWeight: 700,
        width: '250px'
    },
    title:{
        textAlign: 'center',
        marginTop: '25px',
        padding: '30px 30px 10px',
        fontSize: '15px',
        textTransform: 'uppercase',
    },
    valueContainer:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: '20px',
        '& > p':{
            fontSize: '30px',
            fontWeight: 700,
        }
    }
}));