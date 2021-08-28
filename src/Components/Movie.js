import {useParams} from "react-router-dom";
import React from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import {
    Avatar,
    Button,
    Container,
    Divider,
    Grid,
    Paper,
    TextField,
    Typography
} from "@material-ui/core";
import Loader from "../Layout/Loader";
import StarIcon from '@material-ui/icons/Star';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@material-ui/lab";
import {Share} from "@material-ui/icons";
import useShare from "../Hooks/useShare"
import useSnackBar from "../Hooks/useSnackBar";


const useStyles = makeStyles(theme => ({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
    },
    exit: {
        position: "absolute",
        top: 70,
        left: 10
    },
    img: {
        maxWidth: "100%",
        height: "auto",
        borderRadius: 8,
        boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"
    },
    rateBox: {
        border: "1px solid",
        borderColor: theme.palette.primary,
        borderRadius: 15,
        width: "fit-content",
        padding: "5px 0 !important"
    },
    rateStar: {color: "gold", marginTop: 3},
    margins: {marginTop: 15},
    description: {
        maxHeight: 120,
        overflowY: "auto",
        textAlign: "justify",
        padding: 10
    },
    onlyPhone: {
        [theme.breakpoints.up('sm')]: {
            display: "none",
        },
        marginTop: 10,
        marginBottom: 10
    },
    speedDial: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
    bordersTest: {
        border: "1px solid white",
        borderRadius: 10,
        boxShadow: theme.shadows['8'],
        marginBottom: 20,
        textAlign: "justify",
        backgroundColor: theme.palette.type === "dark" ? "#303030" : "#fafafa"
    },
    commentSection: {
        margin: "20px 0",
        width: "90%",
    }
}));


export default function Movie() {

    let {id} = useParams();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [movie, addMovie] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [ShareModal, setShareModalOpen] = useShare(window.location.href);
    const [SnackBar, setSnackBarMessage, setSnackBarOpen, setSnackBarType] = useSnackBar();

    function alert(type, message) {
        setSnackBarMessage(message);
        setSnackBarType(type ? "success" : "error");
        setSnackBarOpen(true);
    }

    const shareCallback = (message) => {
        alert(true, message);
    }

    React.useEffect(() => {
        setIsLoaded(false);
        axios.get('/api/movies/' + id).then(res => {
            if (res.data.success)
                addMovie(res.data['movie']);
            else setError("Unknown error: " + res.data['message'])
        }, error => {
            setError({
                message: error.message,
                status: error.response.status,
                response: error.response.data.message
            })
        }).finally(() => {
            setIsLoaded(true);
        });
    }, [id]);


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    return (
        <Container className={classes.root}>
            {isLoaded ? (
                error ? (
                    <div style={{textAlign: "center", marginTop: 50, color: "red"}}>
                        <Typography variant="h3">
                            {error.status}
                        </Typography>
                        <Typography variant="h6">
                            {error.message}
                        </Typography>
                        <Typography variant="h6">
                            {error.response}
                        </Typography>
                    </div>
                ) : (
                    <>
                        <Grid container spacing={1} justifyContent="center">

                            <Grid
                                item
                                spacing={4}
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                container
                                sm={6}
                                xs={12}
                            >

                                <Grid item>
                                    <Typography variant="h5">{movie.name}</Typography>
                                    <Divider/>
                                </Grid>

                                <Grid item>
                                    <Typography variant="body1">Release Date: {movie.date}</Typography>
                                    <Divider/>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    spacing={1}
                                    className={classes.rateBox}
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                >
                                    <Grid item xs={1}>
                                        <StarIcon className={classes.rateStar}/>
                                    </Grid>
                                    <Grid item xs={8} spacing={0} container>
                                        <Grid item xs={12}>
                                            <Typography align="left" variant="body1">Rate: {movie.rate}/5</Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Typography align="left" variant="subtitle2">{movie['rateCount']} Member(s)
                                                rating</Typography>
                                        </Grid>
                                    </Grid>
                                </Grid>

                                <Grid item>
                                    <Typography
                                        className={classes.description}
                                        variant="body1"
                                        component="p"
                                    >
                                        {movie.description}
                                    </Typography>
                                    <Divider className={classes.onlyPhone}/>
                                </Grid>

                            </Grid>


                            <Grid
                                container
                                justifyContent="center"
                                item
                                sm={6}
                                xs={12}
                            >
                                <img className={classes.img} src={movie['imgPath']} alt="Movie poster"/>
                            </Grid>

                            <Grid className={classes.margins} item xs={12}><Divider/></Grid>

                        </Grid>


                        <Paper className={classes.margins} elevation={3} style={{
                            padding: 10,
                            width: "90%",
                            marginBottom: 15
                        }}>
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                                alignItems="center"

                            >
                                <Grid item xs={11}>
                                    <Typography align="left" variant="h6">Recent comments</Typography>
                                    <Typography
                                        align="left"
                                        variant="subtitle1"
                                    >Latest comments section by users</Typography>
                                </Grid>

                                <Grid
                                    item
                                    container
                                    spacing={3}
                                    xs={11}
                                    className={classes.margins}
                                    direction="column"
                                    justifyContent="center"
                                    alignItems="center"
                                >

                                    <Grid
                                        className={classes.bordersTest}
                                        container
                                        item
                                        xs={12}
                                        sm={11}
                                        spacing={1}
                                    >
                                        <Grid item>
                                            <Avatar>M</Avatar>
                                        </Grid>
                                        <Grid xs={6} sm={5} item container direction="column">
                                            <Grid item>
                                                <Typography variant="body1">Muhaymin</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2">Aug 27, 2021</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item className={classes.margins}>
                                            <Typography variant="body2" style={{maxHeight: 100, overflowY: "auto"}}>
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text
                                            </Typography>
                                        </Grid>
                                    </Grid>


                                    <Grid container item xs={12} sm={11} spacing={1} className={classes.bordersTest}>
                                        <Grid item>
                                            <Avatar>A</Avatar>
                                        </Grid>
                                        <Grid xs={6} sm={5} item container direction="column">
                                            <Grid item>
                                                <Typography variant="body1">Abdulmuhaymin</Typography>
                                            </Grid>
                                            <Grid item>
                                                <Typography variant="subtitle2">Aug 20, 2021</Typography>
                                            </Grid>
                                        </Grid>
                                        <Grid item className={classes.margins}>
                                            <Typography variant="body2" style={{maxHeight: 100, overflowY: "auto"}}>
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text Test comment text Test comment text Test comment text
                                                Test comment text
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid item className={classes.margins}>
                                    <Button variant="outlined">Load More...</Button>
                                </Grid>

                            </Grid>
                        </Paper>
                        <Grid
                            container
                            className={classes.commentSection}
                            alignItems="center"
                            spacing={2}
                        >
                            <Grid item xs={12} sm={11}>
                                <TextField
                            style={{width: "100%"}}
                            id="newComment"
                            label="Comment"
                            multiline
                            variant="outlined"
                        />
                            </Grid>
                            <Grid item xs={12} sm={1}><Button
                                variant="outlined"
                                style={{
                                    display: "block",
                                    width: "100%",
                                    padding: "14.5px 14px"
                                }}
                            >Send</Button></Grid>
                        </Grid>


                        <SpeedDial
                            ariaLabel="SpeedDial example"
                            className={classes.speedDial}
                            icon={<SpeedDialIcon/>}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            open={open}
                            direction="up"
                        >
                            <SpeedDialAction
                                key="Share"
                                icon={<Share/>}
                                tooltipTitle="Share"
                                onClick={async () => {
                                    handleClose();
                                    if (typeof navigator.share === "function")
                                        await navigator.share({
                                            title: movie.name,
                                            text: movie.description,
                                            url: window.location.href
                                        });
                                    else setShareModalOpen(true);
                                }}
                            />
                        </SpeedDial>
                        <ShareModal onClose={shareCallback}/>
                        <SnackBar/>
                    </>

                )
            ) : <Loader/>}
        </Container>
    );
}