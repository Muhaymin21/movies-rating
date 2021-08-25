import {useParams} from "react-router-dom";
import React from "react";
import axios from "axios";
import {makeStyles} from "@material-ui/core/styles";
import {Container, Typography} from "@material-ui/core";
import Loader from "../Layout/Loader";

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
    },
});

export default function Movie() {
    const classes = useStyles();
    let {id} = useParams();
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [movie, addMovie] = React.useState(null);
    const [error, setError] = React.useState(null);

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
                    <h1>Movie {movie.name}</h1>
                )
            ) : <Loader/>}
        </Container>
    );
}