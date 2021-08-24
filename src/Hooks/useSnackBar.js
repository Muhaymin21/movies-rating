import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import React from "react";

export default function useSnackBar() {
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [message, setSnackBarMessage] = React.useState("");
    const [snackBarType, setSnackBarType] = React.useState("success");

    function SnackBar() {
        const handleSnackBarClose = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            setSnackBarOpen(false);
        };

        return (
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={snackBarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}>
                <MuiAlert elevation={6} variant="filled" onClose={handleSnackBarClose} severity={snackBarType}>
                    {message}
                </MuiAlert>
            </Snackbar>
        );
    }

    return [SnackBar, setSnackBarMessage, setSnackBarOpen, setSnackBarType];
}