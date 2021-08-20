import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Button, Container} from "@material-ui/core";
import {useAuth0} from "@auth0/auth0-react";
import {AccountCircle} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    root: {
    padding: "0 5 5",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 100,
  },
  card: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingBottom: theme.spacing(1),
    margin: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
    notLoggedIn: {
    textAlign: "center",
  },
  btn: {
    fontSize: 22,
    marginTop: 15,
  },
}));

export default function MediaControlCard() {
  const classes = useStyles();
  const { user, isAuthenticated, loginWithRedirect } = useAuth0();

  return (
      <Container className={classes.root}>
        {isAuthenticated ? (
    <Card className={classes.card}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography variant="subtitle1" color="textSecondary">
            Name: {(user.name !== user.email) ? user.name : user.nickname}
            <br/>
            Email: {user.email}
          </Typography>
        </CardContent>
        <div className={classes.controls}>
          <Button disabled={true} variant="outlined">
            Edit
          </Button>
          <Button disabled={true} variant="outlined">
            Change Password
          </Button>
        </div>
      </div>
      <CardMedia
        className={classes.cover}
        image={user.picture}
        title="Profile picture"
      />
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
