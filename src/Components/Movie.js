import {useParams} from "react-router-dom";
import React from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import {Container, Divider, Grid, Typography} from "@material-ui/core";
import Loader from "../Layout/Loader";
import StarIcon from '@material-ui/icons/Star';
import {SpeedDial, SpeedDialAction, SpeedDialIcon} from "@material-ui/lab";
import {Share} from "@material-ui/icons";
import useShare from "../Hooks/useShare";

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
}));


export default function Movie() {

    let {id} = useParams();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [movie, addMovie] = React.useState(null);
    const [error, setError] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const [ShareModal, setShareModalOpen] = useShare(window.location.href);

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

    function shareCallback(message) {
        console.log(message);
    }

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
                    </>

                )
            ) : <Loader/>}
        </Container>
    );
}