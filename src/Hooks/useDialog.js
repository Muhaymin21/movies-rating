import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

export default function useDialog() {
const [openDialog, setDialogOpen] = React.useState(false);
  function CustomDialog(props) {

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (value) => {
    props.callback(value);
    setDialogOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={openDialog}
        onClose={()=>{handleClose(false);}}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.header ?? ""}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.body ?? ""}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{handleClose(false);}} color="secondary">
            {props.reject ?? "No"}
          </Button>
          <Button onClick={()=>{handleClose(true);}} color="default" autoFocus>
            {props.accept ?? "Yes"}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
  }
  return [CustomDialog, setDialogOpen];
}
