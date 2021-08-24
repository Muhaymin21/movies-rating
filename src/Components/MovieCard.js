import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {yellow} from '@material-ui/core/colors';
import {MoreVert, Share} from "@material-ui/icons";
import {useAuth0} from "@auth0/auth0-react";
import ReactStars from "react-rating-stars-component";
import useShare from "../Hooks/useShare";
import {Link} from "react-router-dom";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton, Menu, MenuItem,
    Typography
} from "@material-ui/core";
import axios from "axios";
import useDialog from "../Hooks/useDialog";
import {useSelector} from "react-redux";

const useStyles = makeStyles((theme) => ({
    root: {
        width: 345,
        marginTop: 10,
        height: 500,
        ['@media (max-width:370px)']: { // eslint-disable-line no-useless-computed-key
            width: "80vw",
        },
        [theme.breakpoints.down('xs')]: {
            height: "auto",
        },
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    avatar: {
        backgroundColor: yellow[500],
    },
    more: {
        color: theme.palette.info.dark,
        textDecoration: "underline",
        cursor: "pointer"
    },
    textArea: {
        height: 160,
        overflowY: "auto",
        marginTop: 10,
        [theme.breakpoints.down('xs')]: {
            height: "auto",
        },
    },
    linkStyle: {color: "inherit", textDecorationLine: "inherit"}
}));


export default function MovieCard(props) {
    const classes = useStyles();
    const [rate, setRate] = React.useState(props.rate);
    const {isAuthenticated} = useAuth0();
    const url = window.location.origin + '/movies/' + props.id;
    const [ShareModal, SnackBar, setShareModalOpen] = useShare(url);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [CustomDialog, selectedValue, setDialogOpen] = useDialog();
    const scopes = useSelector((state) => state.scope.scopes);

    React.useEffect(() => {
        if (selectedValue) {
            axios.delete('/api/movies/' + props.id).then((r) => {
                console.log(r);
            }, (e) => {
                console.log(e)
            });
        }
    }, [selectedValue, props.id])

    const handleMoreClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const ratingChanged = (newRating) => {
        axios.patch(`/api/movies/${props.id}/rate`, {
            newRate: newRating
        }).then(
            r => {
                if (r.data.success)
                    setRate(r.data['newRate']);
            },
            error => {
                console.error(error);
            }
        );
    };

    function ShortDesc() {
        const len = props.description.length;
        const [showMore, setShowMore] = React.useState(false);

        function toggleReadMore() {
            setShowMore(!showMore);
        }

        if (len > 250)
            return (
                <Typography variant="body2" color="textPrimary" component="p">
                    {showMore ? (
                        <>{props.description} <span onClick={toggleReadMore}
                                                    className={classes.more}>show less...</span></>
                    ) : (
                        <>{props.description.substring(0, 249)} <span onClick={toggleReadMore} className={classes.more}>show more...</span></>
                    )}
                </Typography>
            )
        else
            return (<Typography variant="body2" color="textPrimary" component="p">{props.description}</Typography>);
    }

    function handleMovieDelete() {
        setDialogOpen(true);
        handleMenuClose();
    }

    return (
        <>
            <Card className={classes.root}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="recipe" className={classes.avatar}>
                            {rate}
                        </Avatar>
                    }
                    action={
                        <IconButton
                            onClick={handleMoreClick}
                            aria-label="settings">
                            <MoreVert/>
                        </IconButton>
                    }
                    title={props.title}
                    subheader={props.date}
                />
                <CardMedia
                    className={classes.media}
                    image={props.image}
                    title="poster"
                />
                <CardContent className={classes.textArea}>
                    <ShortDesc/>
                </CardContent>
                <CardActions disableSpacing>
                    {isAuthenticated && (
                        <ReactStars
                            onChange={ratingChanged}
                            size={24}
                            isHalf={true}
                            value={props.stars}
                        />
                    )}
                    <IconButton
                        onClick={async () => {
                            if (typeof navigator.share === "function")
                                await navigator.share({
                                    title: props.title,
                                    text: props.description,
                                    url
                                });
                            else setShareModalOpen(true);
                        }}
                        aria-label="share" style={{marginLeft: 'auto',}}>
                        <Share/>
                    </IconButton>
                </CardActions>
            </Card>
            <ShareModal/>
            <SnackBar/>
            <Menu
                id="menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <Link className={classes.linkStyle} to={"/movies/" + props.id}>
                    <MenuItem onClick={handleMenuClose}>Open</MenuItem>
                </Link>
                {isAuthenticated && (
                    scopes.includes("delete:movie") && (
                        <>
                            <MenuItem onClick={handleMenuClose}>Edit</MenuItem>
                            <MenuItem onClick={handleMovieDelete}>Delete</MenuItem>
                        </>
                    )
                )}
            </Menu>
            {isAuthenticated && (
                scopes.includes("delete:movie") && (
                    <CustomDialog
                        header="Are you sure?"
                        body="Continue with this action will result in deleting this movie with all its data."
                    />
                )
            )}
        </>
    );
}
