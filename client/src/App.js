import React from "react";
import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Layout/Header";
import { useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import MyProfile from "./Components/MyProfile";
import Loader from "./Layout/Loader";
import { useAuth0 } from "@auth0/auth0-react";
import ViewMovies from "./Components/ViewMovies";


export default function App() {
  // const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const prefersDarkMode = useSelector((state) => state.darkMode.status);
  const { isLoading } = useAuth0();
  // const [Loader] = useLoader();

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          type: prefersDarkMode ? "dark" : "light",
          primary: {
            main: prefersDarkMode ? "#002984" : "#3f51b5",
          },
        },
      }),
    [prefersDarkMode]
  );

  // if (isLoading) return <Loader />;

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        {isLoading ? (
          <Loader />
        ) : (
          <Switch>
            <Route path="/" exact component={ViewMovies} />
            <Route path="/myprofile" component={MyProfile} />
            <Route path="/aboutus">
              <div  style={{"textAlign": "center"}}>
              <h1>Capstone</h1>
                  <p>
                      This is the Capstone project for the Full-Stack Nanodegree
                  </p>
              </div>
            </Route>
            <Route path="/contactus">
              <h1>Contact us</h1>
            </Route>
          </Switch>
        )}
      </Router>
    </ThemeProvider>
  );
}
