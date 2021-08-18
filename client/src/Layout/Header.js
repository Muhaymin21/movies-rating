import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggle as toggleDarkMode } from "../Redux/DarkModeSlice";
import {
  Checkbox,
  Drawer,
  MenuItem,
  AppBar,
  Menu,
  Button,
  Toolbar,
  ListItemText,
  Avatar,
  ListItemIcon,
  ListItem,
  IconButton,
  Divider,
  Typography,
  List,
} from "@material-ui/core";
import {
  ChevronLeft,
  AccountCircle,
  Lock,
  LockOpen,
  Home,
  Menu as MenuIcon,
  WbIncandescent,
  Telegram,
  PlusOne,
  Info,
  Brightness4,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    "@media (max-width:400px)": {
      fontSize: "1.2rem",
    },
    "@media (max-width:253px)": {
      fontSize: "0.8rem",
    },
  },
  drawer: {
    width: 240,
    "@media (max-width:240px)": {
      width: 190,
    },
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  linkStyle: { color: "inherit", textDecorationLine: "inherit" },
  shortcutButtons: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width:480px)": {
      display: "none",
    },
  },
}));

export default function Header() {
  const classes = useStyles();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
  const [anchorElAccount, setAnchorElAccount] = React.useState(null);
  const inDarkMode = useSelector((state) => state.darkMode.status);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState(!inDarkMode);
  const menuOpen = Boolean(anchorElAccount);
  const dispatch = useDispatch();

  function closeDrawer() {
    setDrawerOpen(false);
  }

    const handleCloseAccount = () => {
    setAnchorElAccount(null);
  };

  function ToggleDarkMode() {
    return (
      <Checkbox
        onChange={handleChangeDarkMode}
        title="Toggle Dark Mode"
        checked={isChecked}
        icon={<WbIncandescent style={{ color: "#fff" }} />}
        checkedIcon={<Brightness4 />}
        color="default"
      />
    );
  }

  function handleChangeDarkMode(e) {
    setIsChecked(e.target.checked);
    dispatch(toggleDarkMode());
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            onClick={() => setDrawerOpen(true)}
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" className={classes.title}>
            Movies Rating
          </Typography>
          <div className={classes.shortcutButtons}>

            <ToggleDarkMode />
            {isAuthenticated ? (
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={(event) => {
                    setAnchorElAccount(event.currentTarget);
                  }}
                  color="inherit"
                >
                  <Avatar alt={user.name} src={user.picture} />
                </IconButton>

                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElAccount}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={menuOpen}
                  onClose={handleCloseAccount}
                >
                  <Link to="myprofile" className={classes.linkStyle}>
                    <MenuItem onClick={handleCloseAccount}>Profile</MenuItem>
                  </Link>
                  <MenuItem onClick={() => logout()}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <Button
                variant="contained"
                color="default"
                endIcon={<AccountCircle />}
                onClick={() => loginWithRedirect()}
              >
                Login
              </Button>
            )}
          </div>
        </Toolbar>
      </AppBar>

      <Drawer
        classes={{
          paper: classes.drawer,
        }}
        open={drawerOpen}
        onClose={closeDrawer}
      >
        <div className={classes.drawerHeader}>
          <ToggleDarkMode />
          <IconButton onClick={closeDrawer}>
            <ChevronLeft />
          </IconButton>
        </div>
        <Divider />
        <div role="presentation" onClick={closeDrawer} onKeyDown={closeDrawer}>
          <List>
            <Link to="/" className={classes.linkStyle}>
              <ListItem button key="home">
                <ListItemIcon>
                  <Home />
                </ListItemIcon>
                <ListItemText primary="Home" />
              </ListItem>
            </Link>
            {isAuthenticated ? (
              <React.Fragment>
                <Link to="/newmovie" className={classes.linkStyle}>
                  <ListItem key="newmovie" button>
                    <ListItemIcon>
                      <PlusOne />
                    </ListItemIcon>
                    <ListItemText primary="New Movie" />
                  </ListItem>
                </Link>
                <Link to="/myProfile" className={classes.linkStyle}>
                  <ListItem key="myProfile" button>
                    <ListItemIcon>
                      <AccountCircle />
                    </ListItemIcon>
                    <ListItemText primary="My Profile" />
                  </ListItem>
                </Link>
                <ListItem
                  key="Logout"
                  button
                  onClick={() => logout({ returnTo: window.location.origin })}
                >
                  <ListItemIcon>
                    <Lock />
                  </ListItemIcon>
                  <ListItemText primary="Logout" />
                </ListItem>
              </React.Fragment>
            ) : (
              <ListItem key="Login" button onClick={() => loginWithRedirect()}>
                <ListItemIcon>
                  <LockOpen />
                </ListItemIcon>
                <ListItemText primary="Login" />
              </ListItem>
            )}
            <Divider />
            <Link to="/Contactus" className={classes.linkStyle}>
              <ListItem key="/Contactus" button>
                <ListItemIcon>
                  <Telegram />
                </ListItemIcon>
                <ListItemText primary="Contact us" />
              </ListItem>
            </Link>
            <Link to="/Aboutus" className={classes.linkStyle}>
              <ListItem key="/Aboutus" button>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText primary="About us" />
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
