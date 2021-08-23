import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {yellow} from '@material-ui/core/colors';
import {MoreVert, Share} from "@material-ui/icons";
import {useAuth0} from "@auth0/auth0-react";
import ReactStars from "react-rating-stars-component";
import {
    Avatar,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography
} from "@material-ui/core";

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
    }
}));


export default function MovieCard(props) {
    const classes = useStyles();
    const {isAuthenticated} = useAuth0();

    const ratingChanged = (newRating) => {
        console.log(`New rating: ${newRating} for movie with ID: ${props.id}`);
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

    return (
        <Card className={classes.root}>
            <CardHeader
                avatar={
                    <Avatar aria-label="recipe" className={classes.avatar}>
                        {props.rate}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings">
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
                                url: window.location.origin + '/movies/' + props.id,
                            })
                    }}
                    aria-label="share" style={{marginLeft: 'auto',}}>
                    <Share/>
                </IconButton>
            </CardActions>
        </Card>
    );
}
