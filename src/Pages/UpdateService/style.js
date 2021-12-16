import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
    container: {
        flex: 6,
        border: '1px solid #e0e0e0',
        minHeight: '100vh'
    },
    header:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: '15px 30px',
    },
    formContainer:{
        padding: '50px',
    },
    btnBlock:{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
}))