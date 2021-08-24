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
    const [snackBarOpen, setSnackBarOpen] = React.useState(false);
    const [message, setMessage] = React.useState("");

    function SnackBar() {

  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackBarOpen(false);
  };

  return (
      <Snackbar open={snackBarOpen} autoHideDuration={3000} onClose={handleSnackBarClose}>
          <MuiAlert elevation={6} variant="filled" onClose={handleSnackBarClose} severity="success">
              {message}
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

        const handleShare = () => {
            handleClose();
            setMessage("Share popup opened.");
            setSnackBarOpen(true);
        }

        const copyURL = () => {
            navigator.clipboard.writeText(url).then(() => {
                setMessage("Movie URL is copied.");
                setSnackBarOpen(true);
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
                            <WhatsappShareButton children={<WhatsappIcon onClick={handleShare} size={iconsSize} round={iconRounded}/>} url={url}/>
                        </Grid>
                        <Grid item>
                            <FacebookShareButton children={<FacebookIcon onClick={handleShare} size={iconsSize} round={iconRounded}/>}
                                                 url={url}/>
                        </Grid>
                        <Grid item>
                            <TwitterShareButton children={<TwitterIcon onClick={handleShare} size={iconsSize} round={iconRounded}/>}
                                                url={url}/>
                        </Grid>
                        <Grid item>
                            <TelegramShareButton children={<TelegramIcon onClick={handleShare} size={iconsSize} round={iconRounded}/>}
                                                 url={url}/>
                        </Grid>
                        <Grid item>
                            <LinkedinShareButton children={<LinkedinIcon onClick={handleShare} size={iconsSize} round={iconRounded}/>}
                                                 url={url}/>
                        </Grid>
                        <Grid item>
                            <RedditShareButton children={<RedditIcon onClick={handleShare} size={iconsSize} round={iconRounded}/>} url={url}/>
                        </Grid>
                        <Grid item>
                            <EmailShareButton
                                subject="Have a look at this movie"
                                children={<EmailIcon size={iconsSize} onClick={handleShare} round={iconRounded}/>} url={url}
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
