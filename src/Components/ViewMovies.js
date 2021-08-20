import React from "react";
import MovieCard from "./MovieCard";
import {Container, Grid, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Loader from "../Layout/Loader";

const useStyles = makeStyles({
  root: {
    padding: "0 5 5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px 0"
  },
});

export default function ViewMovies() {
  const classes = useStyles();
  const [movies, addMovies] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);

  React.useEffect(() => {
    axios.get('/api/movies')
      .then(
        r => {
          if (r.data.success)
            addMovies(r.data['movies']);
        },
        error => {
          setError(error);
        }
      ).finally(()=>{setIsLoaded(true);})
  }, [])

  if (isLoaded)
  return (
    <Container className={classes.root}>
      <Grid spacing={2} container justifyContent="center" alignItems="center">
      {error ? (
          <Typography variant="body2" component="p">
            {error.message}
          </Typography>
      ) : (
        movies.map((obj, index) => (
          <Grid item key={index}>
            <MovieCard
              date={obj.date}
              rate={obj.rate}
              title={obj.name}
              image={obj.imgPath}
              description={obj.description}
            />
          </Grid>
        ))
      )}
        </Grid>
    </Container>
  );
  else return (<Loader />);
}
