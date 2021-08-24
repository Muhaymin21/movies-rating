import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import {Button, Grid, IconButton} from "@material-ui/core";
import {ExitToApp} from "@material-ui/icons";
import {
    EmailIcon,
    EmailShareButton,
    FacebookIcon,
    FacebookShareButton,
    LinkedinIcon,
    LinkedinShareButton,
    RedditIcon,
    RedditShareButton,
    TelegramIcon,
    TelegramShareButton,
    TwitterIcon,
    TwitterShareButton,
    WhatsappIcon,
    WhatsappShareButton
} from "react-share";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";


const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        top: `50%`,
        left: `50%`,
        transform: `translate(-50%, -50%)`,
    },
    grid: {
        marginTop: 30
    },
    exit: {
        position: "absolute",
        top: 0,
        right: 0
    }
}));

export default function useShare(url = "") {
    const [open, setShareModalOpen] = React.useState(false);
    const [snackBarOpen, setOpen] = React.useState(false);

    function SnackBar() {

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
      <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity="success">
              Movie URL is copied.
          </MuiAlert>
      </Snackbar>
  );
}

    function ShareModal() {
        const iconsSize = 40;
        const iconRounded = true;
        const classes = useStyles();

        const handleClose = () => {
            setShareModalOpen(false);
        };

        const copyURL = () => {
            navigator.clipboard.writeText(url).then(() => {
                setOpen(true);
                setShareModalOpen(false);
            }, e => {
                console.error(e);
            });
        }

        return (
            <Modal
                open={open}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    Where To Share?
                    <IconButton onClick={handleClose} className={classes.exit}>
                        <ExitToApp/>
                    </IconButton>
                    <Grid
                        spacing={1}
                        className={classes.grid}
                        container
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <WhatsappShareButton children={<WhatsappIcon size={iconsSize} round={iconRounded}/>} url={url}/>
                        </Grid>
                        <Grid item>
                            <FacebookShareButton children={<FacebookIcon size={iconsSize} round={iconRounded}/>}
                                                 url={url}/>
                        </Grid>
                        <Grid item>
                            <TwitterShareButton children={<TwitterIcon size={iconsSize} round={iconRounded}/>}
                                                url={url}/>
                        </Grid>
                        <Grid item>
                            <TelegramShareButton children={<TelegramIcon size={iconsSize} round={iconRounded}/>}
                                                 url={url}/>
                        </Grid>
                        <Grid item>
                            <LinkedinShareButton children={<LinkedinIcon size={iconsSize} round={iconRounded}/>}
                                                 url={url}/>
                        </Grid>
                        <Grid item>
                            <RedditShareButton children={<RedditIcon size={iconsSize} round={iconRounded}/>} url={url}/>
                        </Grid>
                        <Grid item>
                            <EmailShareButton
                                subject="Have a look at this movie"
                                children={<EmailIcon size={iconsSize} round={iconRounded}/>} url={url}
                            />
                        </Grid>
                        <Grid item>
                            <Button onClick={copyURL} variant="contained" color="secondary">Copy</Button>
                        </Grid>
                    </Grid>
                </div>
            </Modal>
        );
    }

    return [ShareModal, SnackBar, setShareModalOpen];
}
