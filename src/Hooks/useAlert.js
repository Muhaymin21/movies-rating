import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import Collapse from '@material-ui/core/Collapse';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        marginTop: theme.spacing(2)
    },
}));

export default function useAlert() {
    const [open, setOpen] = React.useState(false);
    const [type, setType] = React.useState("success");
    const [message, setMessage] = React.useState(" ");
    function TransitionAlerts(props) {
        const classes = useStyles();
        return (
            <div className={classes.root}>
                <Collapse in={open}>
                    <Alert
                        style={props.style}
                        className={props.className}
                        severity={type}
                        action={
                            <IconButton
                                aria-label="close"
                                color="inherit"
                                size="small"
                                onClick={() => {
                                    setOpen(false);
                                }}
                            >
                                <CloseIcon fontSize="inherit" />
                            </IconButton>
                        }
                    >
                        {message}
                    </Alert>
                </Collapse>
            </div>
        );
    }

    return [setType, setMessage, setOpen, TransitionAlerts];
}
