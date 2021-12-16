import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        flex: 1,
        padding: '0px 40px',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#fbfbff',
        position: 'sticky',
        top: '70px',
        height: 'calc(100vh - 80px)',
        '& > h4':{
            color: '#bbbaba',
            fontSize: '13px',
            fontWeight: 700,
            marginBottom: '10px',
        },
    },
    menuActive:{
        backgroundColor: 'rgb(240, 240, 255)',
    },
    navLink:{
        padding: '10px',
        textDecoration: 'none',
        fontSize: '13px',
        color: '#555555',
        marginBottom: '20px',
        transition: 'all 0.1s ease',
        '&:hover':{
            backgroundColor: 'rgb(240, 240, 255)',
            opacity: 0.8,
        }
    }
}));