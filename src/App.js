import React from "react";
import {createTheme, ThemeProvider} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Header from "./Layout/Header";
import {useDispatch, useSelector} from "react-redux";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import MyProfile from "./Components/MyProfile";
import LoginLoader from "./Layout/LoginLoader";
import {useAuth0} from "@auth0/auth0-react";
import ViewMovies from "./Components/ViewMovies";
import axios from "axios";
import jwt from "jsonwebtoken";
import MovieForm from "./Components/MovieForm"
import {setScopes} from "./Redux/ScopeSlice";
import Movie from "./Components/Movie";


export default function App() {
    const prefersDarkMode = useSelector((state) => state.darkMode.status);
    const dispatch = useDispatch();
    const {isLoading, isAuthenticated, getAccessTokenSilently} = useAuth0();

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    type: prefersDarkMode ? "dark" : "light",
                    primary: {
                        main: prefersDarkMode ? "#07738D" : "#12A4C7",
                    },
                },
            }),
        [prefersDarkMode]
    );

    if (!isLoading) {
        if (isAuthenticated) {
            getAccessTokenSilently().then(token => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                dispatch(setScopes(jwt.decode(token)['permissions']));
            });
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Router>
                <Header/>
                {isLoading ? (
                    <LoginLoader/>
                ) : (
                    <Switch>
                        <Route path="/" exact component={ViewMovies}/>
                        <Route path="/profile" component={MyProfile}/>
                        <Route path="/movies/create" component={MovieForm}/>
                        <Route path="/movies/:movieID([0-9]+)/edit" component={MovieForm}/>
                        <Route path="/aboutus">
                            <div style={{"textAlign": "center"}}>
                                <h1>Capstone</h1>
                                <p>
                                    This is the Capstone project for the Full-Stack Nanodegree
                                </p>
                            </div>
                        </Route>
                        <Route path="/movies/:id" component={Movie}/>
                        <Route path="/contactus">
                            <h1>Contact us</h1>
                        </Route>
                        <Route><h1>404</h1></Route>
                    </Switch>
                )}
            </Router>
        </ThemeProvider>
    );
}
