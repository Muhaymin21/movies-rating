import React from "react";
import MovieCard from "./MovieCard";
import {Container, Grid, TablePagination, Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Loader from "../Layout/Loader";

const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column"
  },
});

export default function ViewMovies() {
  const classes = useStyles();
  const [movies, addMovies] = React.useState([]);
  const [error, setError] = React.useState(null);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [moviesCount, setMoviesCount] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  React.useEffect(() => {
    setIsLoaded(false);
    const currentPage = page + 1;
    axios.get('/api/movies', { params: { page: currentPage, perPage: rowsPerPage } })
      .then(
        r => {
          if (r.data.success) {
            addMovies(r.data['movies']);
            setMoviesCount(r.data['count']);
          }
        },
        error => {
          setError({
            message: error.message,
            status: error.response.status,
            response: error.response.data.message
          })
        }
      ).finally(()=>{setIsLoaded(true);})
  }, [page, rowsPerPage])

  if (isLoaded)
  return (
    <Container className={classes.root}>
                <TablePagination
      component="div"
      count={moviesCount}
      page={page}
      onPageChange={handleChangePage}
      rowsPerPageOptions={[3, 6, 12, 24, 48, 96]}
      rowsPerPage={rowsPerPage}
      labelRowsPerPage="Movies per page"
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
      <Grid spacing={2} container justifyContent="center" alignItems="center">
      {error ? (
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
      ) : (movies.length > 0) ? (
        movies.map((obj, index) => (
          <Grid item key={index}>
            <MovieCard
              date={obj.date}
              rate={obj.rate}
              title={obj.name}
              image={obj.imgPath}
              description={obj.description}
              id={obj.id}
            />
          </Grid>
        ))
      ) : (
          <Grid item>
            <Typography variant="h4">
              <hr style={{margin: "30px 0"}}/>
              No movies added yet.
            </Typography>
          </Grid>
      )}
        </Grid>
    </Container>
  );
  else return (<Loader />);
}
