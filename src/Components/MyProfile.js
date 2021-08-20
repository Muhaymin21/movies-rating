import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import { Container, Grid } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    padding: "0 5 5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  gridPadding: {
    padding: 5,
  },
  card: {
    maxWidth: 345,
    width: 300,
  },
  img: {
    width: "auto",
    height: "auto",
    borderRadius: 5,
  },
  notLoggedIn: {
    textAlign: "center",
  },
  btn: {
    fontSize: 22,
    marginTop: 15,
  },
});

export default function MyProfile() {
  const classes = useStyles();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
    <Container className={classes.root}>
      {isAuthenticated ? (
        <Card className={classes.card}>
          <CardActionArea>
            <Grid container justifyContent="center" alignItems="center">
              <Grid item className={classes.gridPadding}>
                <CardMedia
                  className={classes.img}
                  component="img"
                  alt="Profile pic"
                  image={user.picture}
                  title="Profile pic"
                />
              </Grid>
            </Grid>
            <CardContent>
              <Typography gutterBottom variant="h6">
                {user.name}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Email: {user.email}
                <br />
                Gender: {user.gender}
                <br />
                Birthday: {user.profile}
                <br />
                Your forms: 8
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" variant="outlined" color="default" disabled={true}>
              Edit
            </Button>
            <Button size="small" variant="outlined" color="default" disabled={true}>
              Change password
            </Button>
          </CardActions>
        </Card>
      ) : (
        <div className={classes.notLoggedIn}>
          <Typography variant="h4">
            You are not logged in, Please login to view this page
          </Typography>
          <hr />
          <Button
            className={classes.btn}
            variant="contained"
            color="default"
            endIcon={<AccountCircle />}
            onClick={() => loginWithRedirect()}
          >
            Login
          </Button>
        </div>
      )}
    </Container>
  );
}
