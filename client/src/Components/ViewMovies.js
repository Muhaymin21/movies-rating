import MovieCard from "./MovieCard";
import { Container, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    padding: "0 5 5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: 50,
  },
});

const movies = [
  {
    name: "Gunpowder Milkshake",
    imgPath: "http://127.0.0.1:5000/static/images/gunpowder.jpg",
    description:
      "The film stars Karen Gillan as a young assassin who must team up with her estranged assassin mother...",
    rate: 6,
    date: "July 14, 2021",
  },
  {
    name: "Cruella",
    imgPath: "http://127.0.0.1:5000/static/images/cruella.jpg",
    description:
      "Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's...",
    rate: 7.4,
    date: "May 28, 2021",
  },
  {
    name: "",
    imgPath: "http://127.0.0.1:5000/static/images/blast-from-past.jpg",
    description:
      "Eccentric American scientist Dr. Calvin Webber (Christopher Walken) believes nuclear war with the Soviet Union is imminent...",
    rate: 6.6,
    date: "February 12, 1999",
  },
  {
    name: "Gunpowder Milkshake",
    imgPath: "http://127.0.0.1:5000/static/images/gunpowder.jpg",
    description:
      "The film stars Karen Gillan as a young assassin who must team up with her estranged assassin mother...",
    rate: 6,
    date: "July 14, 2021",
  },
  {
    name: "Cruella",
    imgPath: "http://127.0.0.1:5000/static/images/cruella.jpg",
    description:
      "Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's...",
    rate: 7.4,
    date: "May 28, 2021",
  },
  {
    name: "",
    imgPath: "http://127.0.0.1:5000/static/images/blast-from-past.jpg",
    description:
      "Eccentric American scientist Dr. Calvin Webber (Christopher Walken) believes nuclear war with the Soviet Union is imminent...",
    rate: 6.6,
    date: "February 12, 1999",
  },
];

export default function ViewMovies() {
  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Grid spacing={2} container justifyContent="center" alignItems="center">
        {movies.map((obj, index) => (
          <Grid item key={index}>
            <MovieCard
              date={obj.date}
              rate={obj.rate}
              title={obj.name}
              image={obj.imgPath}
              description={obj.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
