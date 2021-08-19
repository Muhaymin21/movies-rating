import MovieCard from "./MovieCard";
import {Container, Grid} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const imagesPath = process.env.PUBLIC_URL + '/assets/images/';
const useStyles = makeStyles({
  root: {
    padding: "0 5 5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    margin: "30px 0"
  },
});

const movies = [
  {
    name: "Gunpowder Milkshake",
    imgPath: "gunpowder.jpg",
    description:
      "The film stars Karen Gillan as a young assassin who must team up with her estranged assassin mother (Lena Headey) and her former assassin colleagues (Carla Gugino, Michelle Yeoh, and Angela Bassett) in order to save a young girl (Chloe Coleman) from other assassins.",
    rate: 6,
    date: "July 14, 2021",
  },
  {
    name: "Cruella",
    imgPath: "cruella.jpg",
    description:
      "Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's 1956 novel The Hundred and One Dalmatians.[10] The film is directed by Craig Gillespie with a screenplay by Dana Fox and Tony McNamara, from a story by Aline Brosh McKenna, Kelly Marcel, and Steve Zissis.[11] It is the third live-action adaptation in the 101 Dalmatians franchise and serves as both a prequel and reboot. Emma Stone stars as the title character, with Emma Thompson, Joel Fry, Paul Walter Hauser, Emily Beecham, Kirby Howell-Baptiste, and Mark Strong in supporting roles. Set in London during the punk rock movement of the 1970s, the film revolves around Estella Miller, an aspiring fashion designer, as she explores the path that will lead her to become a notorious up-and-coming fashion designer known as Cruella de Vil.[12]",
    rate: 7.4,
    date: "May 28, 2021",
  },
  {
    name: "Blast from the past",
    imgPath: "blast-from-past.jpg",
    description:
      "Eccentric American scientist Dr. Calvin Webber (Christopher Walken) believes nuclear war with the Soviet Union is imminent...",
    rate: 6.6,
    date: "February 12, 1999",
  },
  {
    name: "Gunpowder Milkshake",
    imgPath: "gunpowder.jpg",
    description:
      "The film stars Karen Gillan as a young assassin who must team up with her estranged assassin mother...",
    rate: 6,
    date: "July 14, 2021",
  },
  {
    name: "Cruella",
    imgPath: "cruella.jpg",
    description:
      "Cruella is a 2021 American crime comedy film based on the character Cruella de Vil from Dodie Smith's...",
    rate: 7.4,
    date: "May 28, 2021",
  },
  {
    name: "Blast from the past",
    imgPath: "blast-from-past.jpg",
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
              image={imagesPath + obj.imgPath}
              description={obj.description}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
