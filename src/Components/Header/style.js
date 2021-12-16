import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container:{
        height: '70px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0px 50px',
        backgroundColor: '#fbfbff',
        position: 'sticky',
        top: 0,
        overflow: 'hidden',
        zIndex: 999,
    },
    logo:{
        fontWeight: 700,
        fontSize: '30px',
        color: '#555555',
    },
    adminHeader:{
        display: 'flex',
        alignItems: 'center',
        '& > div':{
            marginRight: '20px',
            textTransform: 'uppercase',
            fontWeight: 700,
            fontSize: '15px'
        },
        '& > Button':{
            color:'#555555 !important',
            border: '1px solid #555555 !important',
        }
    }
}));