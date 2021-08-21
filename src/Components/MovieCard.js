import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {yellow} from '@material-ui/core/colors';
import Rating from '@material-ui/lab/Rating';
import {StarBorder, MoreVert, Share} from "@material-ui/icons";
import {useAuth0} from "@auth0/auth0-react";
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
        maxWidth: 345,
        height: 500
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
        marginTop: 10
    }
}));


export default function MovieCard(props) {
    const classes = useStyles();
    const {isAuthenticated} = useAuth0();

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
                     <Rating
                    name=""
                    defaultValue={0}
                    precision={0.5}
                    emptyIcon={<StarBorder fontSize="inherit"/>}
                />
                )}
                <IconButton aria-label="share" style={{marginLeft: 'auto',}}>
                    <Share/>
                </IconButton>
            </CardActions>
        </Card>
    );
}
