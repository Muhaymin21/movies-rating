import "./css/Loader.css";
import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        '& div:after': {
            backgroundColor: theme.palette.type === "dark" ? "white" : "black"
        }
    },
}));

export default function Loader() {
    const classes = useStyles();
    return (
        <div className={`lds-spinner ${classes.root}`}>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
            <div/>
        </div>
    );
}